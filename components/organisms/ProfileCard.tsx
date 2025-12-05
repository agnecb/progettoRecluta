"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface ProfileCardProps {
    username: string;
    email: string;
    bio: string;
}

export default function ProfileCard({ username, email, bio }: ProfileCardProps) {
    const { user, logout } = useAuth(); // <-- prendi user e logout dal contesto

    return (
        <div className="w-full max-w-2xl bg-card text-card-foreground border border-gray-300/20 rounded-xl p-6 space-y-6">

            {/* Username + Email */}
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Informazioni utente</h2>
                <p className="text-gray-400 text-sm">I tuoi dati personali</p>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold mb-0 text-gray-400">Username</h3>
                <p className="text-lg">@{username}</p>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold mb-0 text-gray-400">Email</h3>
                <p className="text-lg">{email}</p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
                <h3 className="font-semibold mb-0 text-gray-400">Bio</h3>
                <p className="text-lg italic">
                    {bio?.trim() ? bio : (
                        <>
                            Nessuna bio aggiunta.
                            <Link href="/profile/edit" className="px-1 underline-offset-4 hover:underline text-blue-500">
                                Aggiungine una!
                            </Link>
                        </>
                    )}
                </p>


            </div>

            {/* Bottoni */}
            <div className="flex flex-col gap-3">
                <Link href="/profile/edit">
                    <Button className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600">
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
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                        </svg>
                        Modifica profilo
                    </Button>
                </Link>

                <Button onClick={logout} className="w-full rounded-3xl bg-rose-800 hover:bg-rose-900 border border-gray-300/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-5 w-5 mr-0" aria-hidden="true"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>
                    Esci dall'account
                </Button>
            </div>
        </div>
    );
}
