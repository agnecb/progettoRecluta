"use client";

import { useState } from "react";
import MobileAuthSidebar from "./MobileAuthSidebar";

export default function MobileGuestTopBar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Top bar visibile solo su mobile */}
            <nav className="
                md:hidden 
                fixed top-0 left-0 right-0 z-50
                h-14 bg-background/95 backdrop-blur
                border-b border-gray-400/20
                supports-backdrop-filter:bg-background/20
            ">
                <div className="container mx-auto px-4 h-full flex items-center justify-between">

                    {/* HAMBURGER */}
                    <button
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center justify-center size-9 rounded-md hover:bg-accent hover:text-accent-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="h-5 w-5">
                            <path d="M4 5h16"></path>
                            <path d="M4 12h16"></path>
                            <path d="M4 19h16"></path>
                        </svg>
                    </button>

                    {/* Spaziatore per centrare eventuali elementi */}
                    <div className="w-10"></div>
                </div>
            </nav>

            {/* Sidebar */}
            <MobileAuthSidebar open={open} setOpen={setOpen} />
        </>
    );
}
