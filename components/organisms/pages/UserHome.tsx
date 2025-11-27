"use client"

import Sidebar from "@/components/organisms/Sidebar";
import Feed from "@/components/organisms/Feed";

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
  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">
        <div className="hidden md:block w-72">
          <Sidebar />
        </div>

        <div className="min-h-screen py-6">
          <div className="container mx-4">
            <h2 className="font-bold text-2xl pb-4 border-b border-gray-300/20">Il tuo Feed</h2>

            {/* Feed dei post */}
            <Feed posts={MOCK_POSTS} />
          </div>
        </div>
      </div>
    </div>
  );
}
