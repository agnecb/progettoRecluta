"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import PostCard from "@/components/molecules/PostCard";
import { Separator } from "@/components/ui/separator";
import { getUserPosts } from "@/services/posts";
import { getLikes } from "@/services/likes";
import { getComments } from "@/services/comments";

const CURRENT_USER_ID = "a3bc9093-a34c-4355-a9d1-899d6fed6ea9"; // <--- sostituisci con l'id reale del logged user
const MOCK_LOGGED = true;

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  author: { id: string; username: string };
}

interface PostWithLikes extends Post {
  likesCount: number;
  commentsCount: number;
}

export default function LikesPage() {
  const [posts, setPosts] = useState<PostWithLikes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLikes() {
      try {
        setLoading(true);
        setError(null);

        // 1. Prendo tutti i post dell'utente loggato
        const myPosts = await getUserPosts(CURRENT_USER_ID);

        // 2. Per ogni post prendo likes (conteggio) e commenti (conteggio)
        const postsWithLikes = await Promise.all(
          myPosts.map(async (post: Post) => {
            const [likesData, commentsData] = await Promise.all([
              getLikes(post.id),      // conteggio dei like
              getComments(post.id),   // conteggio commenti
            ]);

            return {
              ...post,
              likesCount: likesData || 0,
              commentsCount: commentsData.count || 0,
            } as PostWithLikes;
          })
        );

        // 3. Filtra solo post con almeno un like
        const likedPosts = postsWithLikes.filter((p) => p.likesCount > 0);

        // 4. Ordina per data decrescente
        likedPosts.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setPosts(likedPosts);
      } catch (err: any) {
        setError(err.message || "Errore nel recupero dei like");
      } finally {
        setLoading(false);
      }
    }

    loadLikes();
  }, []);

  if (loading) return <p className="text-center py-10">Caricamento...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;


  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

        {/* SIDEBAR */}
        <div className="hidden md:block w-72">
          {MOCK_LOGGED ? <Sidebar /> : <AuthSidebar />}
        </div>

        {/* MAIN */}
        <div className="min-h-screen py-6">
          <div className="container mx-4 max-w-5xl w-full">
            <h2 className="font-bold text-2xl mb-6">I tuoi Mi piace</h2>

            {posts.length === 0 ? (
              <div className="flex flex-col flex-1 justify-center items-center text-center mt-6">
                <p className="text-xl my-2 text-gray-400">Ancora nessun like ricevuto</p>
                <p className="text-sm mb-2 text-gray-400">
                  I like che ricevi ai tuoi post appariranno qui.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                {posts.map((post) => (
                  <div key={post.id} className="flex flex-col gap-3">

                    {/* Notifica like */}
                    <div className="mb-1 p-4 bg-card/50 rounded-lg border border-gray-400/20 flex items-center gap-3">
                      {/* Replichiamo l’icona “U” tante volte quanti sono i like */}
                      <div className="flex -space-x-2">
                        {Array(post.likesCount).fill(null).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 bg-blue-700/20 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background"
                            title="Utente"
                          >
                            U
                          </div>
                        ))}
                      </div>

                      {/* Testo notifica */}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {Array(post.likesCount).fill("Utente").join(" e ")} {post.likesCount === 1 ? "ha" : "hanno"} messo mi piace al tuo post
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{post.likesCount} mi piace totale</p>
                      </div>
                    </div>


                    {/* Post */}
                    <div className="border-b border-gray-400/20">
                      <PostCard
                        id={post.id}
                        user_id={post.user_id}
                        content={post.content}
                        created_at={post.created_at}
                        likes={post.likesCount}
                        comments={post.commentsCount}
                        author={post.author}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
