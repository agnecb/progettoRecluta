"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function MobileGuestSidebar({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
}) {
    return (
        <aside
            className={`
                fixed top-0 left-0 bottom-0 w-72 bg-background 
                border-r border-gray-400/20 z-50 p-6
                transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            <div className="flex flex-col h-full justify-between">

                {/* Chiudi */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setOpen(false)}
                        className="
                            inline-flex items-center justify-center size-9 
                            rounded-md hover:bg-accent hover:text-accent-foreground
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="h-5 w-5">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* contenuto */}
                <div>
                    <h2 className="font-bold text-2xl mb-6">Partecipa alla conversazione</h2>

                    <div className="flex flex-col gap-4">
                        <Link href="/signup">
                            <Button className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600 text-primary-foreground">
                                Crea account
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button className="w-full rounded-3xl bg-gray-900 border border-gray-300/20 hover:bg-gray-950">
                                Accedi
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Parte inferiore: link termini e privacy */}
                <div className="flex flex-col gap-2 pb-20">
                    <a href="#" className="text-sm underline-offset-4 hover:underline text-blue-500">
                        Termini di servizio
                    </a>
                    <a href="#" className="text-sm underline-offset-4 hover:underline text-blue-500">
                        Informativa sulla privacy
                    </a>
                </div>
            </div>
        </aside>
    );
}
