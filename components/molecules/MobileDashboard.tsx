"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// bottom menu
export default function MobileDashboard() {
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path ? "text-blue-500" : "text-gray-400";

    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-background/95 backdrop-blur border-t border-gray-300/20 p-2 md:hidden z-50 supports-backdrop-filter:bg-background/20">

            <Link href="/" className={`flex flex-col items-center ${isActive("/")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-5 w-5">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="text-xs">Home</span>
            </Link>

            <Link href="/likes" className={`flex flex-col items-center ${isActive("/likes")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-5 w-5">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                </svg>
                <span className="text-xs">Likes</span>
            </Link>

            <Link href="/profile" className={`flex flex-col items-center ${isActive("/profile")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-5 w-5">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-xs">Profile</span>
            </Link>
        </nav>
    );
}
