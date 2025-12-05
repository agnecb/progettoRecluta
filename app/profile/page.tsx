"use client";

import { useState, useEffect } from "react";
import ProfileCard from "@/components/organisms/ProfileCard";
import ProfileTabs from "@/components/organisms/ProfileTabs";
import Sidebar from "@/components/organisms/Sidebar";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import { getPost, getUserPosts } from "@/services/posts";
import { getCommentsByUser, getCommentsCountByUser, getCommentsCount } from "@/services/comments";
import { getLikes, getUserLikedPostIds } from "@/services/likes";
import { useAuth } from "@/context/AuthContext";
import { getUser } from "@/services/users";
import MobileDashboard from "@/components/molecules/MobileDashboard";
import MobileAuthTopBar from "@/components/molecules/MobileAuthTopBar";
import MobileAuthBottomBar from "@/components/molecules/MobileAuthBottomBar";

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
}

export default function ProfilePage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<any>(null); // user fresco dal DB
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (authLoading) return;

    async function loadProfile() {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 0. Prendi dati utente aggiornati dal DB
        const freshUser = await getUser(authUser.id);
        setUser(freshUser);

        // 1. Post dell’utente
        const userPosts = await getUserPosts(authUser.id);
        const postsWithCounts = await Promise.all(
          userPosts.map(async (post: Post) => {
            const [likesCount, commentsCount] = await Promise.all([
              getLikes(post.id),
              getCommentsCountByUser(post.id),
            ]);
            return { ...post, likes: likesCount, comments: commentsCount };
          })
        );
        setPosts(postsWithCounts);

        // 2. Commenti dell’utente
        const userComments = await getCommentsByUser(authUser.id);
        setComments(userComments);
        setCommentsCount(userComments.length);


        // 3. Post a cui l’utente ha messo like
        const likedIds = await getUserLikedPostIds(authUser.id);
        const likedPosts = await Promise.all(
          likedIds.map(async (postId: string) => {
            const post = await getPost(postId);
            const [likesCount, commentsCount] = await Promise.all([
              getLikes(post.id),
              getCommentsCount(post.id),
            ]);
            return { ...post, likes: likesCount, comments: commentsCount };
          })
        );
        setLikes(likedPosts);

      } catch (err: any) {
        setError(err.message || "Errore nel caricamento del profilo");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [authUser, authLoading]);

  if (authLoading) return <p className="text-center py-10">Caricamento...</p>;

  return (
    <div className="container max-w-5xl mx-auto min-h-screen lg:pb-16">
      <div className="md:hidden">
        {user && <MobileDashboard />}
        {!user && <MobileAuthTopBar />}
        {!user && <MobileAuthBottomBar />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

        {/* A SINISTRA: sidebar dinamica */}
        <div className="hidden md:block w-72 h-full">
          {user ? <Sidebar /> : <AuthSidebar />}
        </div>


        {/* CONTENUTO PRINCIPALE */}
        <div className={`min-h-screen py-6 pb-20` + (!user ? " pt-20 md:pt-6" : "")}>
          <div className="container mx-4 max-w-4xl w-full">
            <h2 className="font-bold text-2xl mb-6">Profilo</h2>

            {!authUser && (
              <p className="text-gray-400 text-md text-center">
                Devi essere loggato per vedere il tuo profilo.
              </p>
            )}

            {authUser && loading && (
              <p className="text-center py-10">Caricamento...</p>
            )}

            {authUser && error && (
              <p className="text-center py-10 text-red-500">{error}</p>
            )}

            {authUser && !loading && !error && user && (
              <>
                <ProfileCard
                  username={user.username}
                  email={user.email}
                  bio={user.bio || ""}
                />
                <ProfileTabs
                  posts={posts}
                  comments={comments}
                  likes={likes}
                  commentsCount={commentsCount}
                />

              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
