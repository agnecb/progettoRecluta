"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import Link from "next/link";
import PostCard from "@/components/molecules/PostCard";
import { Separator } from "@/components/ui/separator";
import CommentCard from "@/components/molecules/CommentCard";
import { getPost } from "@/services/posts";
import { getComments } from "@/services/comments";
import { getLikes } from "@/services/likes";
import { useParams } from "next/navigation";

const MOCK_LOGGED = true;

interface Comment {
    id: string;
    user_id: string;
    post_id: string,
    content: string;
    created_at: string;
    likes?: number,
    author: {
        id: string;
        username: string;
    };
}

interface Post {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    author: { id: string; username: string };
}

export default function PostPage() {
    const { id } = useParams() as { id: string };

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isLogged = MOCK_LOGGED;

    useEffect(() => {
        async function loadPost() {
            try {
                setLoading(true);
                setError(null);

                if (!id) {
                    setError("ID del post non valido");
                    return;
                }
                const p = await getPost(id);

                // fallback per author se undefined
                const postWithAuthor = {
                    ...p,
                    author: p.author ?? { id: "unknown", username: "unknown" },
                };
                setPost(postWithAuthor);

                // fetch likes (conteggio) e commenti (lista)
                const [likesData, commentsData] = await Promise.all([
                    getLikes(id),
                    getComments(id),
                ]);

                setLikes(likesData.count);
                setComments(commentsData.items.reverse() || []);
                setCommentsCount(commentsData.count);
            } catch (err: any) {
                setError(err.message || "Errore nel caricamento del post");
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);


    if (loading) return <p className="text-center py-10">Caricamento...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
    if (!post) return <p className="text-center py-10">Post non trovato</p>;

    return (
        <div className="container max-w-5xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">
                <div className="hidden md:block w-72">
                    {isLogged ? <Sidebar /> : <AuthSidebar />}
                </div>
                <div className="min-h-screen py-6">
                    <div className="container mx-4 max-w-5xl w-full">
                        {/* TITOLO PAGINA + FRECCIA */}
                        <div className="flex items-center gap-2 mb-4">
                            <Link href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-5 w-5 mx-2" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg></Link>
                            <h2 className="font-bold text-2xl">Post</h2>
                        </div>

                        {/* ------ POST ------ */}
                        <PostCard
                            id={post.id}
                            user_id={post.user_id}
                            content={post.content}
                            created_at={post.created_at}
                            likes={likes}
                            comments={commentsCount}
                            author={post.author}
                        />

                        <Separator className="mb-2 bg-gray-400/20" />

                        {/* ------ FORM AGGIUNGI COMMENTO ------ */}
                        <div className="px-0">
                            <textarea
                                className="w-full p-3 mb-2 mt-3 border rounded-sm bg-background border-gray-400/20 text-grey-400 text-sm focus:outline-none focus:ring focus:ring-primary/30"
                                placeholder="Scrivi un commento..."
                                rows={3}
                            />
                            <div className="w-full flex justify-end">
                                <button className="mt-2 mb-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
                                    Commenta
                                </button>
                            </div>
                        </div>

                        {/* ------ LISTA COMMENTI ------ */}
                        <div className="flex flex-col gap-4">
                            {comments.length === 0 ? (
                                <div className="flex flex-col flex-1 justify-center items-center text-center">
                                    <p className="text-md mb-2 text-gray-400">Ancora nessun commento. Sii il primo a commentare!.</p>
                                </div>
                            ) : (
                                comments.map((c) => (
                                    <div key={c.id} className="pb-2">
                                        <CommentCard
                                            id={c.id}
                                            post_id={c.post_id}
                                            user_id={c.user_id}
                                            content={c.content}
                                            created_at={c.created_at}
                                            author={c.author}
                                            likes={0} // poi puoi aggiungere count di like dei commenti
                                        />
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
