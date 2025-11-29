"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import DashboardHome from "../molecules/Dashboard";
import Dashboard from "../molecules/Dashboard";

export default function AuthSidebar() {
    return (
        <div className="hidden md:flex max-w-sm flex-col justify-between h-full p-6 border-r border-gray-300/20">

            {/* Parte superiore: titolo + dati user + collegamenti */}
            <div>
                <h2 className="font-bold text-2xl mb-6">MiniTwitter</h2>

                {/* Dati user */}
                <div className="flex flex-col py-5 border-b border-gray-300/20">
                    <span className="font-semibold">@recluta</span>
                    <span className="text-sm text-gray-400">recluta@gmail.com</span>
                </div>


                {/* Bottone per creare nuovo post */}
                <div className="flex flex-col py-5 gap-1">
                    <Link href="/post">
                        <Button className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600 text-primary-foreground">
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
                            Nuovo post
                        </Button>
                    </Link>
                </div>

                <Dashboard/>
            </div>


            {/* Parte inferiore: Esci */}
            <div className="flex flex-col gap-2">
                <a href="#" className="text-sm flex px-0 underline-offset-4 hover:underline text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-5 w-5 mr-2" aria-hidden="true"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    </svg>Esci
                </a>
            </div>
        </div>
    );
}
