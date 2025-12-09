"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import PostCard from "@/components/molecules/PostCard";
import { getUserPosts } from "@/services/posts";
import { getLikes } from "@/services/likes";
import { getComments } from "@/services/comments";
import { useAuth } from "@/context/AuthContext";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import MobileDashboard from "@/components/molecules/MobileDashboard";
import MobileAuthBottomBar from "@/components/molecules/MobileAuthBottomBar";
import MobileAuthTopBar from "@/components/molecules/MobileAuthTopBar";
import FloatingNewPostButton from "@/components/atoms/FloatingButton";

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
  const { user, loading: authLoading } = useAuth();

  const [posts, setPosts] = useState<PostWithLikes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carico i like SOLO se c'è l'utente loggato
  useEffect(() => {
    if (authLoading) return;

    // Utente non loggato → non carico nulla, ma la pagina si renderizza
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadLikes() {
      try {
        setLoading(true);
        setError(null);

        const myPosts = await getUserPosts(user?.id);

        const postsWithLikes = await Promise.all(
          myPosts.map(async (post: Post) => {
            const [likesData, commentsData] = await Promise.all([
              getLikes(post.id),
              getComments(post.id),
            ]);

            return {
              ...post,
              likesCount: likesData || 0,
              commentsCount: commentsData.count || 0,
            };
          })
        );

        const likedPosts = postsWithLikes
          .filter((p) => p.likesCount > 0)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        setPosts(likedPosts);
      } catch (err: any) {
        setError(err.message || "Errore nel recupero dei like");
      } finally {
        setLoading(false);
      }
    }

    loadLikes();
  }, [user, authLoading]);

  // Attesa caricamento auth
  if (authLoading)
    return <p className="text-center py-10">Caricamento...</p>;

  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="md:hidden">
        {user && <MobileDashboard />}
        {!user && <MobileAuthTopBar />}
        {!user && <MobileAuthBottomBar />}
      </div>
      <FloatingNewPostButton />
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

        {/* A SINISTRA: sidebar dinamica */}
        <div className="hidden md:block w-72 h-full">
          {user ? <Sidebar /> : <AuthSidebar />}
        </div>


        {/* CONTENUTO PRINCIPALE */}
        <div className={`min-h-screen py-6 pb-20` + (!user ? " pt-20 md:pt-6" : "")}>
          <div className="container mx-4 max-w-4xl w-full">
            <h2 className="font-bold text-2xl mb-6">I tuoi Mi piace</h2>

            {/* UTENTE NON LOGGATO */}
            {!user && (
              <p className="text-gray-400 text-md text-center">
                Devi essere loggato per vedere i like ricevuti.
              </p>
            )}

            {/* LOGGATO MA CARICAMENTO */}
            {user && loading && (
              <p className="text-center py-10">Caricamento likes ricevuti...</p>
            )}

            {/* LOGGATO MA ERRORE */}
            {user && error && (
              <p className="text-center py-10 text-red-500">{error}</p>
            )}

            {/* LOGGATO MA NESSUN LIKE */}
            {user && !loading && posts.length === 0 && !error && (
              <div className="flex flex-col justify-center items-center text-center mt-6">
                <p className="text-xl text-gray-400">
                  Ancora nessun like ricevuto
                </p>
                <p className="text-sm text-gray-400">
                  I like ricevuti ai tuoi post appariranno qui.
                </p>
              </div>
            )}

            {/* 🔹 LOGGATO E CI SONO LIKE */}
            {user && posts.length > 0 && (
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                {posts.map((post) => (
                  <div key={post.id} className="flex flex-col gap-3">

                    {/* Box notifica like */}
                    <div className="mb-1 p-4 bg-card/50 rounded-lg border border-gray-400/20 flex items-center gap-3">

                      {/* Avatar generici */}
                      <div className="flex -space-x-2">
                        {(() => {
                          const total = post.likesCount;

                          if (total <= 3) {
                            return Array(total)
                              .fill(null)
                              .map((_, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 bg-blue-700/20 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background"
                                >
                                  U
                                </div>
                              ));
                          }

                          const remaining = total - 3;

                          return (
                            <>
                              {[0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="w-8 h-8 bg-blue-700/20 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background"
                                >
                                  U
                                </div>
                              ))}
                              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background">
                                +{remaining}
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {post.likesCount === 1 &&
                            "Utente ha messo mi piace al tuo post"}
                          {post.likesCount === 2 &&
                            "Utente e Utente hanno messo mi piace al tuo post"}
                          {post.likesCount === 3 &&
                            "Utente, Utente e Utente hanno messo mi piace al tuo post"}
                          {post.likesCount >= 4 &&
                            `Utente, Utente, Utente e altri ${post.likesCount - 3} hanno messo mi piace al tuo post`}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {post.likesCount} mi piace totale
                        </p>
                      </div>
                    </div>

                    {/* Post */}
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
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
