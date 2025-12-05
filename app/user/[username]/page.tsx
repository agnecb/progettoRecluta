"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/organisms/Sidebar";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import PostCard from "@/components/molecules/PostCard";
import { getUserByUsername, getUserStats } from "@/services/users";
import { getUserPosts } from "@/services/posts";
import { getComments } from "@/services/comments";
import { getLikes } from "@/services/likes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import MobileDashboard from "@/components/molecules/MobileDashboard";
import MobileAuthTopBar from "@/components/molecules/MobileAuthTopBar";
import MobileAuthBottomBar from "@/components/molecules/MobileAuthBottomBar";

interface Post {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    likes?: number;
    comments?: number;
    author: { id: string; username: string };
}

export interface User {
    id: string;
    username: string;
    email: string;
    bio?: string | null;
    created_at: string;
}

function formatJoinDate(dateString: string) {
    const date = new Date(dateString);
    // Mese abbreviato in italiano
    const monthNames = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
}

export default function UserProfilePage() {
    // prendo username dall'url dinamico
    const { username } = useParams() as { username: string };
    const { isAuthenticated } = useAuth();

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<{ posts: number; likes: number; comments: number } | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                console.log("username dalla URL:", username);

                const u = await getUserByUsername(username);
                if (!u) {
                    setError("Utente non trovato");
                    return;
                }
                setUser(u);

                // 1. CARICO LE STATISTICHE DELL’UTENTE
                const statsData = await getUserStats(u.id);
                setStats(statsData);

                // 2. CARICO I POST DELL’UTENTE
                const userPosts = await getUserPosts(u.id);

                // 3. ARRICCHISCO OGNI POST CON likes e commenti
                const postsWithCounts = await Promise.all(
                    userPosts.map(async (post: Post) => {
                        const [likes, commentsData] = await Promise.all([
                            getLikes(post.id),
                            getComments(post.id),
                        ]);
                        return {
                            ...post,
                            likes,
                            comments: commentsData.count,
                        };
                    })
                );
                setPosts(postsWithCounts);

            } catch (err: any) {
                setError(err.message || "Errore nel caricamento");
            } finally {
                setLoading(false);
            }
        }
        if (username) loadData();
    }, [username]);

    if (loading) return <p className="text-center py-10">Caricamento...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
    if (!user) return <p className="text-center py-10">Utente non trovato</p>;

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


                {/* profilo */}
                <div className={`min-h-screen py-6 pb-20` + (!isAuthenticated ? " pt-20 md:pt-6" : "")}>
                    <div className="container mx-4 max-w-5xl w-full">
                        {/* HEADER */}
                        <div className="flex items-center gap-2 mb-4">
                            <Link href="/">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-arrow-left h-5 w-5 mx-2"
                                >
                                    <path d="m12 19-7-7 7-7" />
                                    <path d="M19 12H5" />
                                </svg>
                            </Link>
                            <div>
                                <h2 className="font-bold text-xl">{user.username}</h2>
                                <p className="text-xs text-gray-400">{posts.length} post</p>
                            </div>
                        </div>
                        <Separator className="my-4 bg-gray-400/20" />

                        {/* INFO UTENTE */}
                        <div className="px-4 pt-6 pb-4 text-center">
                            <Avatar className="h-14 w-14 mx-auto mb-4">
                                <AvatarFallback className="bg-card text-xl">
                                    {user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <h2 className="text-xl font-bold">{user.username}</h2>
                            <p className="text-gray-400">@{user.username}</p>

                            {user.bio && <p className="text-sm text-gray-500 mt-2">{user.bio}</p>}


                            {/* Joined */}
                            <p className="text-sm mt-2 text-gray-400 text-center mb-4">
                                Si è unito a {formatJoinDate(user.created_at)}
                            </p>

                            {/* Stats */}
                            <div className="flex justify-center gap-6">
                                <div className="text-center">
                                    <div className="font-bold text-lg">{stats?.posts ?? 0}</div>
                                    <div className="text-sm text-gray-400">Post</div>
                                </div>

                                <div className="text-center">
                                    <div className="font-bold text-lg">0</div>  {/* SISTEMA CONTEGGIO COMMENTI ({stats?.comments ?? 0} VIENE 40 ANCHE SE E' 0) */}
                                    <div className="text-sm text-gray-400">Commenti</div>
                                </div>

                                <div className="text-center">
                                    <div className="font-bold text-lg">{stats?.likes ?? 0}</div>
                                    <div className="text-sm text-gray-400">Mi piace</div>
                                </div>
                            </div>
                        </div>

                        {/* LISTA POST */}
                        <h3 className="font-semibold text-md my-3 text-center">
                            Post ({posts.length})
                        </h3>
                        <div className="flex flex-col">
                            {posts.map((post, i) => (
                                <div key={post.id} className={`${i === 0 ? "hover:border-t hover:border-blue-500 border-t border-transparent" : ""}`}>
                                    <PostCard {...post} />
                                    {i < posts.length - 1 && (
                                        <Separator className="my-0 bg-gray-400/20" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
