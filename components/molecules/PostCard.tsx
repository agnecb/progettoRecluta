"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { updatePost, deletePost } from "@/services/posts";
import { useAuth } from "@/context/AuthContext";
import { getLikeStatus, likePost, unlikePost } from "@/services/likes";
import { useEffect } from "react";


// formattazione data
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month}, ${hours}:${minutes}`;
}

// formattazione markdown 
export function formatMarkdown(text: string) {
    let formatted = text;

    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
    formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");
    // List
    formatted = formatted.replace(/^- (.*)$/gm, "<li>$1</li>");
    if (formatted.includes("<li>")) formatted = `<ul>${formatted}</ul>`;
    // Line breaks
    formatted = formatted.replace(/\n/g, "<br>");

    return formatted;
}

interface PostCardProps {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    likes?: number;
    comments?: number;
    author: { id: string; username: string; };
}

export default function PostCard({ id, user_id, content, created_at, likes = 0, comments = 0, author }: PostCardProps) {
    const router = useRouter();

    const { user } = useAuth();
    const isOwner = user?.id === author.id;

    const [hasLiked, setHasLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);


    const [openEdit, setOpenEdit] = useState(false);
    const [draft, setDraft] = useState(content);
    const [postContent, setPostContent] = useState(content);
    const isOwnPost = user?.id === author.id;

    const handleSave = async () => {
        try {
            await updatePost(id, { content: draft });
            setPostContent(draft);
            setOpenEdit(false);
        } catch (err: any) {
            console.error("Errore aggiornando post:", err.message || err);
        }
    };
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // evita il click sul card intero
        if (!confirm("Sei sicuro di voler eliminare questo post?")) return;

        try {
            await deletePost(id); // authFetch gestisce token
            alert("Post eliminato!");
            router.refresh(); // oppure aggiorna la lista dei post genitore
        } catch (err: any) {
            console.error("Errore eliminando il post:", err.message || err);
            alert(err.message || "Errore eliminando il post");
        }
    };
    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            //alert("Devi essere loggato per mettere like");
            return;
        }
        try {
            if (hasLiked) {
                await unlikePost(id);
                setHasLiked(false);
                setLikeCount(likeCount - 1);
            } else {
                await likePost(id);
                setHasLiked(true);
                setLikeCount(likeCount + 1);
            }
        } catch (err: any) {
            console.error("Errore like:", err.message || err);
            alert("Errore nel mettere like");
        }
    };
    useEffect(() => {
        if (!user) return;
        let active = true;
        const loadStatus = async () => {
            try {
                const status = await getLikeStatus(id, user.id);
                if (active) {
                    setHasLiked(status.liked);
                    setLikeCount(status.like_count);
                }
            } catch (err) {
                console.error("Errore caricamento stato like", err);
            }
        };
        loadStatus();
        return () => { active = false };
    }, [user, id]);

    return (
        <Card
            className="relative w-full py-2 border-0 bg-background hover:bg-popover-foreground rounded-none cursor-pointer"
            onClick={() => router.push(`/post/${id}`)}
        >
            {/* BOTTONI MODIFICA / ELIMINA SOLO SE PROPRIETARIO */}
            {isOwner && (
                <>
                    {/* DELETE — in alto */}
                    <button
                        onClick={handleDelete}
                        title="Elimina post"
                        className="absolute top-3 right-3 
                                    p-2 
                                    text-muted-foreground 
                                    hover:text-destructive 
                                    rounded-full 
                                    hover:bg-card 
                                    transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash-2"
                        >
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>

                    {/* EDIT — in basso a destra */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenEdit(true);
                        }}
                        aria-label="Modifica"
                        className="ml-auto text-sm text-muted-foreground hover:text-blue-500 transition-colors absolute bottom-3 right-3 p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-pen"
                        >
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                        </svg>
                    </button>

                    {/* DIALOG MODIFICA */}
                    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogContent className="sm:max-w-lg border-gray-400/20">
                            <DialogHeader>
                                <DialogTitle className="text-foreground">Modifica post</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-gray-400 mb-2">
                                Puoi aggiornare il contenuto del tuo post qui sotto.
                            </p>
                            <Textarea
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                className="mb-4 border-gray-400/20"
                                rows={5}
                            />
                            <DialogFooter className="flex justify-end gap-2">
                                <Button className="bg-gray-700 hover:bg-gray-800" onClick={() => setOpenEdit(false)}>
                                    Annulla
                                </Button>
                                <Button className=" bg-blue-500 hover:bg-blue-600" onClick={handleSave}>Salva</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}

            <CardHeader className="flex items-center gap-3 mb-0 pb-0 pt-2">
                <Avatar className="py-0">
                    <AvatarFallback className="bg-card">
                        <Link
                            href={`/user/${author.username}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {author.username.charAt(0).toUpperCase()}
                        </Link>
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <Link
                        href={`/user/${author.username}`}
                        className="text-sm font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        @{author.username}
                    </Link>
                    <p className="text-xs text-gray-400">{formatDate(created_at)}</p>
                </div>
            </CardHeader>


            <CardContent className="my-0 py-0">
                <p className="text-md text-foreground my-0"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
                ></p>
            </CardContent>

            <CardFooter className="flex gap-4 my-0 py-0">
                {/* Like */}
                <button
                    onClick={handleLike}
                    disabled={isOwnPost}
                    className="group flex items-center gap-1 text-gray-500 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={hasLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={hasLiked ? "text-red-600" : "group-hover:text-red-600"}
                        aria-hidden="true"
                    >
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                    </svg>
                    {likeCount > 0 && <span>{likeCount}</span>}
                </button>

                {/* Comment */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/post/${id}`);
                    }}
                    className="group flex items-center gap-1 text-gray-500 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle group-hover:text-blue-500"
                        aria-hidden="true"
                    >
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    {comments > 0 && <span>{comments}</span>}
                </button>
            </CardFooter>
        </Card>
    );
}
