"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import ProfileEditCard from "@/components/organisms/ProfileEditCard";
import { getUserByUsername } from "@/services/users";
import { useAuth } from "@/context/AuthContext";
import MobileDashboard from "@/components/molecules/MobileDashboard";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import MobileAuthTopBar from "@/components/molecules/MobileAuthTopBar";
import MobileAuthBottomBar from "@/components/molecules/MobileAuthBottomBar";
import FloatingNewPostButton from "@/components/atoms/FloatingButton";

export default function ProfileEditPage() {
    const { user: authUser, loading: authLoading } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading) return;

        if (!authUser) {
            setLoading(false);
            setError("Devi essere loggato per modificare il profilo.");
            return;
        }

        async function loadUser() {
            try {
                setLoading(true);
                setError(null);

                // Recupera dati dell'utente loggato tramite username
                const u = await getUserByUsername(authUser?.username);
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
    }, [authUser, authLoading]);

    if (authLoading || loading) {
        return <p className="text-center py-10">Caricamento...</p>;
    }
    if (error) {
        return <p className="text-center py-10 text-red-500">{error}</p>;
    }
    if (!user) {
        return <p className="text-center py-10 text-gray-400">Utente non trovato</p>;
    }

    return (
        <div className="container max-w-5xl mx-auto min-h-screen">
            <div className="md:hidden">
                {user && <MobileDashboard />}
                {!user && <MobileAuthTopBar />}
                {!user && <MobileAuthBottomBar />}
            </div>
            <FloatingNewPostButton />
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

                {/* A SINISTRA: sidebar dinamica */}
                <div className="hidden md:block w-72 h-full">
                    {user ? <Sidebar /> : <AuthSidebar />}
                </div>


                {/* CONTENUTO PRINCIPALE */}
                <div className={`min-h-screen py-6 pb-20` + (!user ? " pt-20 md:pt-6" : "")}>
                    <div className="container mx-4 justify-center items-center w-full">
                        <h2 className="font-bold w-full text-2xl mb-6">Modifica profilo</h2>
                        <ProfileEditCard user={user} />
                    </div>
                </div>

            </div>
        </div>
    );
}
