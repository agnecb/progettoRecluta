"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/services/users";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProfileEditCardProps {
    user: {
        id: number;
        username: string;
        email: string;
        bio: string;
    };
}

export default function ProfileEditCard({ user }: ProfileEditCardProps) {
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    // PRENDI refreshUser dal contesto
    const { refreshUser } = useAuth();

    useEffect(() => {
        setSuccess(false);
    }, [username, bio]);

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // 1. PATCH al backend
            await updateUser(user.id, { username, bio });

            // 2. Aggiorna stato globale /me
            await refreshUser();

            // 3. Redirect
            router.push("/profile");
        } catch (err: any) {
            setError(err.message || "Errore durante l'aggiornamento");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-xl bg-card text-card-foreground border-gray-300/20">
            <CardContent className="space-y-6">

                <div className="flex flex-col gap-2">
                    <Label htmlFor="username" className="text-gray-400 text-sm">Username</Label>
                    <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-background border-gray-300/20"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="bio" className="text-gray-400 text-sm">Bio</Label>
                    <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-background border-gray-300/20 resize-none h-32"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">Profilo aggiornato con successo!</p>}

            </CardContent>

            <CardFooter className="flex gap-3">
                <Button
                    onClick={handleSave}
                    className="rounded-md bg-blue-500 hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Salvando..." : "Salva"}
                </Button>

                <Button className="rounded-md bg-gray-700 hover:bg-gray-800" disabled={loading}>
                    <Link href="/profile">Annulla</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
