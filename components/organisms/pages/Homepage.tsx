"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import Sidebar from "@/components/organisms/Sidebar";
import Feed from "@/components/organisms/Feed";

import { getPosts } from "@/services/posts";
import { getLikes } from "@/services/likes";
import { getCommentsCount } from "@/services/comments";
import MobileDashboard from "@/components/molecules/MobileDashboard";
import MobileAuthTopBar from "@/components/molecules/MobileAuthTopBar";
import MobileAuthBottomBar from "@/components/molecules/MobileAuthBottomBar";

interface Post {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    author: { id: string; username: string };
}

interface PostWithCounts extends Post {
    likes: number;
    comments: number;
}

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    const [posts, setPosts] = useState<PostWithCounts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                setError(null);

                const data = await getPosts();

                const postsWithCounts = await Promise.all(
                    data.map(async (post: Post) => {
                        const [likes, comments] = await Promise.all([
                            getLikes(post.id),
                            getCommentsCount(post.id),
                        ]);

                        return {
                            ...post,
                            likes: likes || 0,
                            comments: comments || 0,
                        };
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
        <div className="container max-w-5xl mx-auto min-h-screen lg:pb-16">
            <div className="md:hidden">
                {isAuthenticated && <MobileDashboard />}
                {!isAuthenticated && <MobileAuthTopBar />}
                {!isAuthenticated && <MobileAuthBottomBar />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

                {/* A SINISTRA: sidebar dinamica */}
                <div className="hidden md:block w-72 h-full">
                    {isAuthenticated ? <Sidebar /> : <AuthSidebar />}
                </div>

                {/* FEED */}
                <div className={`min-h-screen py-6 pb-20` + (!isAuthenticated ? " pt-20 md:pt-6" : "")}>
                    <div className="container mx-4">
                        <h2 className="font-bold text-2xl mb-2 pb-4 border-b border-gray-300/20">
                            {isAuthenticated ? "Il tuo Feed" : "Discover"}
                        </h2>

                        {loading && (
                            <p className="text-center py-10 text-gray-400">Caricamento post...</p>
                        )}

                        {error && (
                            <p className="text-center py-10 text-red-500">{error}</p>
                        )}

                        {!loading && !error && <Feed posts={posts} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
