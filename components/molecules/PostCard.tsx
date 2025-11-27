"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const MOCK_LOGGED = true;

interface PostCardProps {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    likes?: number;
    comments?: number;
}

// formattazione data
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month}, ${hours}:${minutes}`;
}

// formattazione markdown semplice
export function formatMarkdown(text: string) {
    let formatted = text;
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");
    formatted = formatted.replace(/^- (.*)$/gm, "<li>$1</li>");
    if (formatted.includes("<li>")) {
        formatted = `<ul>${formatted}</ul>`;
    }
    return formatted;
}

export default function PostCard({ id, user_id, content, created_at, likes = 0, comments = 0 }: PostCardProps) {
    const router = useRouter();
    const isLogged = MOCK_LOGGED;

    return (
        <Card
            className="w-full py-2 border-0 bg-background hover:bg-popover-foreground rounded-none cursor-pointer"
            onClick={() => router.push(`/post/${id}`)}
        >
            <CardHeader className="flex items-center gap-3 mb-0 pb-0 pt-2">
                {/* Avatar con link al profilo */}
                <Avatar className="py-0">
                    <AvatarFallback className="bg-card">
                        <a href={`/user/${user_id}`} onClick={(e) => e.stopPropagation()}>
                            {user_id.charAt(0).toUpperCase()}
                        </a>
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    {/* Username con link */}
                    <a
                        href={`/user/${user_id}`}
                        className="text-sm font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        @{user_id}
                    </a>
                    <p className="text-xs text-gray-400">{formatDate(created_at)}</p>
                </div>
            </CardHeader>

            <CardContent className="my-0 py-0">
                <p
                    className="text-md text-foreground my-0"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
                ></p>
            </CardContent>

            <CardFooter className="flex gap-4 my-0 py-0">
                {/* Like button */}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("Like clicked");
                    }}
                    className="group flex items-center gap-1 text-gray-500 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart group-hover:text-red-600"
                        aria-hidden="true"
                    >
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                    </svg>
                    {isLogged && (<span className="group-hover:text-red-600">{likes}</span>)}
                </button>
                

                {/* Comment button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("Comment clicked");
                    }}
                    className="group flex items-center gap-1 text-gray-500 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle group-hover:text-blue-500"
                        aria-hidden="true"
                    >
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    <span className="group-hover:text-blue-500">{comments}</span>
                </button>
            </CardFooter>
        </Card>
    );
}
