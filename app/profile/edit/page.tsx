"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import ProfileEditCard from "@/components/organisms/ProfileEditCard";
import { getUserByUsername } from "@/services/users";

const MOCK_LOGGED = true;

export default function ProfileEditPage() {
    const username = "recluta"; // da sostituire con auth
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadUser() {
            try {
                setLoading(true);
                setError(null);

                const u = await getUserByUsername(username);
                if (!u) {
                    setError("Utente non trovato");
                    return;
                }
                setUser(u);
            } catch (err: any) {
                setError(err.message || "Errore nel caricamento utente");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [username]);

    if (loading) return <p className="text-center py-10">Caricamento...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
    if (!user) return <p className="text-center py-10">Utente non trovato</p>;

    return (
        <div className="container max-w-5xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

                <div className="hidden md:block w-72">
                    {MOCK_LOGGED && <Sidebar />}
                </div>

                <div className="min-h-screen py-6">
                    <div className="container mx-4 justify-center items-center w-full">
                        <h2 className="font-bold w-full text-2xl mb-6">Modifica profilo</h2>
                        <ProfileEditCard user={user} setUser={setUser} />
                    </div>
                </div>

            </div>
        </div>
    );
}
