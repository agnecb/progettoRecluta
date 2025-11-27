"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // per salvare l'url corrente

export default function Dashboard() {
    const pathname = usePathname();

    const linkBase =
        "flex items-center gap-2 pl-3 pr-15 py-2 rounded-xl transition";

    const isActive = (path: string) =>
        pathname === path
            ? "bg-blue-950 text-blue-500 font-medium"
            : "hover:bg-accent/30 text-gray-300";

    return (
        <nav className="mt-5 space-y-1">
            <Link href="/" className={`${linkBase} ${isActive("/")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="h-6 w-6">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                Home
            </Link>

            <Link href="/likes" className={`${linkBase} ${isActive("/likes")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="h-6 w-6">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                </svg>
                Likes
            </Link>

            <Link href="/profile" className={`${linkBase} ${isActive("/profile")}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="h-6 w-6">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
            </Link>
        </nav>
    );
}

/* Per far apparire selezionato il pulsante corrente:
- usePathname() restituisce esattamente l’URL corrente (/home, /likes, /profile).
- La funzione isActive(path) restituisce classi diverse:
    - attivo → bg-blue-950 text-blue-500 font-medium
    - non attivo → hover:bg-accent/30 text-gray-300
- Usando template strings ${isActive("/home")} viene applicato automaticamente lo stile giusto.
*/