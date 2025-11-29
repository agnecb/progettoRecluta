"use client"

import { useEffect, useState } from "react";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import Feed from "@/components/organisms/Feed";
import { getPosts } from "@/services/posts";
import { getLikes } from "@/services/likes";
import { getCommentsCount } from "@/services/comments";

interface Post {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    likes?: number;
    comments?: number;
    author: { id: string; username: string };
}

export default function AuthHomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                const data = await getPosts(); // leggi tutti i post

                // Per ogni post, calcola likes e commenti
                const postsWithCounts = await Promise.all(
                    data.map(async (post: Post) => {
                        const [likes, comments] = await Promise.all([
                            getLikes(post.id),
                            getCommentsCount(post.id)
                        ]);

                        return { ...post, likes, comments };
                    })
                );
                setPosts(postsWithCounts);
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
                <div className="hidden md:block w-72 h-full">
                    <AuthSidebar />
                </div>

                <div className="min-h-screen py-6">
                    <div className="container mx-4">
                        <h2 className="font-bold text-2xl mb-2 pb-4 border-b border-gray-300/20">Discover</h2>

                        {loading && <p className="text-center py-10 text-gray-400">Caricamento post...</p>}
                        {error && <p className="text-center py-10 text-red-500">{error}</p>}

                        {!loading && !error && <Feed posts={posts} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
