"use client";

import Link from "next/link";

export default function MobileAuthBottomBar() {
    return (
        <nav
            className="
                fixed bottom-0 left-0 right-0 z-50 
                md:hidden
                bg-background/95 backdrop-blur
                border-t border-gray-400/20
                supports-backdrop-filter:bg-background/20
            "
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                {/* MiniTwitter */}
                <Link href="/" className="text-xl font-bold text-foreground">
                    MiniTwitter
                </Link>

                {/* Bottoni */}
                <div className="flex gap-3">

                    {/* Crea Account */}
                    <Link href="/signup">
                        <button
                            className="
                                inline-flex items-center justify-center gap-2
                                w-full rounded-3xl bg-blue-500 hover:bg-blue-600 text-primary-foreground
                                h-9 px-4 py-2  text-sm font-medium
                            "
                        >
                            Crea Account
                        </button>
                    </Link>

                    {/* Accedi */}
                    <Link href="/login">
                        <button
                            className="
                                inline-flex items-center justify-center gap-2
                                w-full rounded-3xl bg-gray-900 border border-gray-300/20 hover:bg-gray-950
                                h-9 px-4 py-2  text-sm font-medium
                                shadow-xs hover:text-accent-foreground
                                dark:bg-input/30 dark:border-input dark:hover:bg-input/50
                            "
                        >
                            Accedi
                        </button>
                    </Link>

                </div>

            </div>
        </nav>
    );
}
