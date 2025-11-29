"use client";

import { useState, useEffect } from "react";
import ProfileCard from "@/components/organisms/ProfileCard";
import ProfileTabs from "@/components/organisms/ProfileTabs";
import Sidebar from "@/components/organisms/Sidebar";
import { getUserByUsername } from "@/services/users";
import { getPost, getUserPosts } from "@/services/posts";
import { getComments, getCommentsByUser, getCommentsCount } from "@/services/comments";
import { getLikes, getUserLikedPostIds } from "@/services/likes";

const MOCK_LOGGED = true;

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  author: { id: string; username: string };
  likes?: number;
  comments?: number;
}

interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  author: { id: string; username: string };
  likes?: number;
}

export default function ProfilePage() {
  const username = "recluta"; // da sostituire con auth in futuro

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);

        if (!username) {
          setError("Username non valido");
          return;
        }

        // 1. Dati utente --> poi da auth
        const u = await getUserByUsername(username);
        if (!u) {
          setError("Utente non trovato");
          return;
        }
        setUser(u);

        // 2. Post dell'utente
        const userPosts = await getUserPosts(u.id);
        const postsWithCounts: Post[] = await Promise.all(
          userPosts.map(async (post: Post) => {
            const [postLikes, postComments] = await Promise.all([
              getLikes(post.id),            // likes totali del post (conteggio)
              getCommentsCount(post.id),   // commenti totali del post (lista)
            ]);
            return {
              ...post,
              likes: postLikes,
              comments: postComments,
            };
          })
        );
        postsWithCounts.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(postsWithCounts);

        // 3. Commenti dell'utente
        const userComments = await getCommentsByUser(u.id);
        setComments(userComments);

        // 4a. Post a cui l'utente ha messo like
        const likedPostIds = await getUserLikedPostIds(u.id); // lista di post_id 

        // 4b. Recupera i post corrispondenti
        const likedPosts: Post[] = await Promise.all(
          likedPostIds.map(async (post_id: string) => {
            const post = await getPost(post_id);  // post completo dal backend
            const [postLikes, postComments] = await Promise.all([
              getLikes(post.id),
              getCommentsCount(post.id),
            ]);

            return {
              ...post,
              likes: postLikes,
              comments: postComments,
              author: post.author ?? { id: post.user_id, username: post.user_id },
            };
          })
        );
        likedPosts.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setLikes(likedPosts);

      } catch (err: any) {
        setError(err.message || "Errore nel caricamento del profilo");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  if (loading) return <p className="text-center py-10">Caricamento...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!user) return <p className="text-center py-10">Utente non trovato</p>;

  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">
        <div className="hidden md:block w-72">
          {MOCK_LOGGED && <Sidebar />}
        </div>

        <div className="min-h-screen py-6">
          <div className="container mx-4 justify-center items-center w-full">
            <h2 className="font-bold w-full text-2xl mb-6">Profilo</h2>

            <ProfileCard
              username={user.username}
              email={user.email}
              bio={user.bio}
            />

            <ProfileTabs
              posts={posts}
              comments={comments}
              likes={likes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
