"use client"

import Sidebar from "@/components/organisms/Sidebar";
import Feed from "@/components/organisms/Feed";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/posts";

// MOCK per test visivo
const MOCK_POSTS = [
  {
    id: "1",
    user_id: "MarioRossi",
    content: "Ciao a tutti! Questo è il mio primo post.",
    created_at: "2025-11-25T10:00:00Z",
    likes: 3,
    comments: 1,
  },
  {
    id: "2",
    user_id: "simona",
    content: "Ecco un altro post! **bold** _aaaaa_",
    created_at: "2025-11-24T15:30:00Z",
    likes: 5,
    comments: 2,
  },
  {
    id: "3",
    user_id: "user",
    content: "Ecco un altro post! lalalalalalalla aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    created_at: "2025-11-24T15:30:00Z",
    likes: 0,
    comments: 1,
  },
];

/* HOMEPAGE quando l'utente è loggato */
export default function UserHomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await getPosts(); // leggi tutti i post
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Errore nel caricamento dei post");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);
  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">
        <div className="hidden md:block h-full w-72">
          <Sidebar />
        </div>

        <div className="min-h-screen py-6">
          <div className="container mx-4">
            <h2 className="font-bold text-2xl pb-4 border-b border-gray-300/20">Il tuo Feed</h2>

            {/* Feed dei post */}
            {loading && <p className="text-center py-10 text-gray-400">Caricamento post...</p>}
            {error && <p className="text-center py-10 text-red-500">{error}</p>}

            {!loading && !error && <Feed posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
}
