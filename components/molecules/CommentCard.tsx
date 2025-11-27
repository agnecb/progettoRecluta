"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const MOCK_LOGGED = true;


interface CommentCardProps {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    likes?: number;
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

function formatMarkdown(text: string) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.*?)_/g, '<em>$1</em>');
}

export default function CommentCard({ user_id, content, created_at, likes = 0 }: CommentCardProps) {
    const isLogged = MOCK_LOGGED;

    return (
        <div className="flex gap-3 w-full">

            {/* Avatar */}
            <Avatar>
                <AvatarFallback className="bg-card">
                    {user_id.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            {/* Contenuto commento */}
            <div className="flex flex-col w-full bg-popover-foreground mx-1 p-3 rounded-lg">

                {/* Top row: username + date */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">@{user_id}</span>
                    <span className="text-gray-400 text-xs">{formatDate(created_at)}</span>
                </div>

                {/* Contenuto */}
                <p
                    className="text-md mt-1"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
                ></p>

                {/* Like button */}
                <footer>
                    <button
                        onClick={() => console.log("Like clicked")}
                        className="group flex items-center gap-1 text-gray-500 focus:outline-none mt-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-heart group-hover:text-red-600"
                        >
                            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                        </svg>
                        {isLogged && (<span className="group-hover:text-red-600 text-xs">{likes}</span>)}
                    </button>
                </footer>

            </div>
        </div>
    );
}
