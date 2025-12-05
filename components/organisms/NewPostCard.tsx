"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost } from "@/services/posts";
import { useAuth } from "@/context/AuthContext";

export default function NewPostCard() {
    const [content, setContent] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handlePublish = async () => {
        if (!user) return;
        if (!content.trim()) return; // evita post vuoti

        try {
            setLoading(true);

            await createPost({ user_id: user.id, content });

            router.push("/");  // torni al profilo dopo la pubblicazione

        } catch (err) {
            console.error("Errore creando post:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-xl bg-card text-card-foreground border-gray-300/20">
            <CardContent className="space-y-6">
                <div className="flex flex-col gap-2">
                    <Textarea
                        id="content"
                        placeholder="Cosa stai pensando?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-background border-gray-300/20 resize-none h-32"
                    />
                </div>
            </CardContent>

            <CardFooter className="flex gap-3 justify-between">
                <p className="text-sm text-gray-400">
                    Supporta Markdown: **grassetto**, _corsivo_, liste, ecc.
                </p>

                <Button
                    className="rounded-md bg-blue-500 hover:bg-blue-600"
                    disabled={loading}
                    onClick={handlePublish}
                >
                    {loading ? "Pubblico..." : "Pubblica"}
                </Button>
            </CardFooter>
        </Card>
    );
}
