"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostCard from "@/components/molecules/PostCard";
import { useState } from "react";
import CommentCard from "../molecules/CommentCard";


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
    likes?: number;
}

interface ProfileTabsProps {
    posts: Post[];
    comments: Comment[];
    likes: Post[];
}

export default function ProfileTabs({ posts, comments, likes }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState<"posts" | "comments" | "likes">("posts");

    return (
        <div className="w-full mt-4">

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "posts" | "comments" | "likes")}>
                {/* HEADER TABS */}
                <TabsList className="w-full grid grid-cols-3 bg-background border-b border-muted-foreground/20 rounded-md p-1 text-muted-foreground">
                    <TabsTrigger
                        value="posts"
                        className="text-sm font-medium w-full 
                                    data-[state=active]:text-foreground 
                                    data-[state=inactive]:text-gray-400">
                        Post ({posts.length})
                    </TabsTrigger>

                    <TabsTrigger
                        value="comments"
                        className="text-sm font-medium w-full 
                                    data-[state=active]:text-foreground 
                                    data-[state=inactive]:text-gray-400">
                        Commenti ({comments.length})
                    </TabsTrigger>

                    <TabsTrigger
                        value="likes"
                        className="text-sm font-medium w-full 
                                    data-[state=active]:text-foreground 
                                    data-[state=inactive]:text-gray-400">
                        Mi piace ({likes.length})
                    </TabsTrigger>
                </TabsList>


                {/* POSTS */}
                <TabsContent value="posts" className="mt-0">
                    {posts.length === 0 ? (
                        <div className="flex flex-col flex-1 justify-center items-center text-center">
                            <p className="text-sm mb-2 text-gray-400">Non hai ancora pubblicato post.</p>
                        </div>
                    ) : (
                        posts.map((p) => <div key={p.id} className="border-b border-gray-400/20"><PostCard {...p} /></div>)
                    )}
                </TabsContent>

                {/* COMMENTS */}
                <TabsContent value="comments" className="mt-0">
                    {comments.length === 0 ? (
                        <div className="flex flex-col flex-1 justify-center items-center text-center">
                            <p className="text-xl my-2 text-gray-400">Ancora nessun commento </p>
                            <p className="text-sm mb-2 text-gray-400">I commenti che pubblichi appariranno qui.</p>
                        </div>
                    ) : (
                        comments.map((c) => (
                            <CommentCard
                                key={c.id}
                                id={c.id}
                                post_id={c.post_id}       // <-- obbligatorio
                                user_id={c.user_id}
                                content={c.content}
                                created_at={c.created_at}
                                author={c.author}         // <-- obbligatorio
                                likes={c.likes ?? 0}
                            />
                        ))
                    )}
                </TabsContent>

                {/* LIKES */}
                <TabsContent value="likes" className="space-y-4 mt-0">
                    {likes.length === 0 ? (
                        <div className="flex flex-col flex-1 justify-center items-center text-center mt-6">
                            <p className="text-xl my-2 text-gray-400">Ancora nessun like </p>
                            <p className="text-sm mb-2 text-gray-400">I post a cui metti mi piace appariranno qui.</p>
                        </div>
                    ) : (
                        likes.map((l) => (<div key={l.id} className="border-b border-gray-400/20"><PostCard {...l} /></div>
                        ))

                    )}
                </TabsContent>

            </Tabs>
        </div>
    );
}
