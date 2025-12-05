"use client"

import MobileAuthBottomBar from "@/components/molecules/MobileAuthBottomBar";
import MobileAuthTopBar from "@/components/molecules/MobileAuthTopBar";
import MobileDashboard from "@/components/molecules/MobileDashboard";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import NewPostCard from "@/components/organisms/NewPostCard";
import Sidebar from "@/components/organisms/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function NewPostPage() {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return null; // evita flash

    return (
        <div className="container max-w-5xl mx-auto min-h-screen lg:pb-16">
            <div className="md:hidden">
                {user && <MobileDashboard />}
                {!user && <MobileAuthTopBar />}
                {!user && <MobileAuthBottomBar />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

                {/* A SINISTRA: sidebar dinamica */}
                <div className="hidden md:block w-72 h-full">
                    {user ? <Sidebar /> : <AuthSidebar />}
                </div>


                {/* CONTENUTO PRINCIPALE */}
                <div className={`min-h-screen py-6 pb-20` + (!user ? " pt-20 md:pt-6" : "")}>
                    <div className="container mx-4 justify-center items-center w-full">
                        <div className="col w-full">
                            <h2 className="font-bold w-full text-2xl mb-2">Crea un nuovo post</h2>
                            <p className="text-sm my-2 text-gray-400 mb-6">Condividi i tuoi pensieri con la community</p>

                            {!isAuthenticated ? (
                                <p className="text-gray-400 text-center text-sm mt-6">Per pubblicare qualcosa devi essere loggato</p>
                            ) : (
                                <NewPostCard />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
