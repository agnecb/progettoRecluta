import Sidebar from "@/components/organisms/Sidebar";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import PostCard from "@/components/molecules/PostCard";

const MOCK_LOGGED = true;

interface PageProps {
    params: { username: string };
}

function formatJoinDate(dateString: string) {
    const date = new Date(dateString);
    // Mese abbreviato in italiano
    const monthNames = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosot", "settembre", "ottobre", "novembre", "dicembre"];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
}

/* pagina del singolo user */
export default async function UserProfilePage({ params }: PageProps) {
    const isLogged = MOCK_LOGGED;
    const username = "MarioRossi";

    // -------- MOCK USER DATA --------
    const mockUser = {
        username: username,
        bio: "",
        joined: "2024-03-12T10:00:00Z",
        posts_count: 2,
        comments_count: 34,
        likes_count: 0,
    };

    // -------- MOCK POSTS DI QUESTO UTENTE --------
    const mockUserPosts = [
        {
            id: "c11",
            user_id: username,
            content: "Sono d'accordo, ottima osservazione!",
            created_at: "2025-11-18T12:10:00Z",
            likes: 2,
            comments: 3
        },
        {
            id: "c12",
            user_id: username,
            content: "Grazie mille! Mi fa piacere che ti sia stato utile 😊",
            created_at: "2025-11-18T13:22:00Z",
            likes: 4,
            comments: 0
        }
    ];

    return (

        <div className="container max-w-5xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

                {/* SIDEBAR */}
                <div className="hidden md:block w-72">
                    {isLogged ? <Sidebar /> : <AuthSidebar />}
                </div>

                {/* PROFILE SECTION */}
                <div className="min-h-screen py-6">
                    <div className="container mx-4 max-w-5xl w-full">

                        {/* FRECCIA + USERNAME */}
                        <div className="flex items-center gap-2 mb-4">

                            {/* DEVO TORNARE INDIETRO AL POST DA CUI PROVENGO */}
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-arrow-left h-5 w-5 mx-2">
                                    <path d="m12 19-7-7 7-7" />
                                    <path d="M19 12H5" />
                                </svg>
                            </Link>

                            <div>
                                <h2 className="font-bold text-xl">{mockUser.username}</h2>
                                <p className="text-xs text-gray-400">{mockUser.posts_count} post</p>
                            </div>
                        </div>
                        <Separator className="my-4 bg-gray-400/20" />


                        {/* ----- USER HEADER ----- */}
                        <div className="px-4 pt-6 pb-4">

                            {/* Avatar centrato */}
                            <div className="flex justify-center mb-4">
                                <Avatar className="h-14 w-14">
                                    <AvatarFallback className="bg-card text-xl">
                                        {(mockUser.username).charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>


                            {/* Nome, username */}
                            <div className="text-center mb-4">
                                <h2 className="text-xl font-bold">{mockUser.username}</h2>
                                <p className="text-gray-400">@{mockUser.username}</p>
                            </div>

                            {/* Bio */}
                            {mockUser.bio && (
                                <p className="text-sm text-gray-500 text-center mb-4">
                                    {mockUser.bio}
                                </p>
                            )}

                            {/* Joined */}
                            <p className="text-sm text-gray-400 text-center mb-4">
                                Si è unito a {formatJoinDate(mockUser.joined)}
                            </p>

                            {/* Stats */}
                            <div className="flex justify-center gap-6">
                                <div className="text-center">
                                    <div className="font-bold text-lg">{mockUser.posts_count}</div>
                                    <div className="text-sm text-gray-400">Post</div>
                                </div>

                                <div className="text-center">
                                    <div className="font-bold text-lg">{mockUser.comments_count}</div>
                                    <div className="text-sm text-gray-400">Commenti</div>
                                </div>

                                <div className="text-center">
                                    <div className="font-bold text-lg">{mockUser.likes_count}</div>
                                    <div className="text-sm text-gray-400">Mi piace</div>
                                </div>
                            </div>
                        </div>

                        {/* LISTA POST DELL'UTENTE */}
                        <h3 className="font-semibold text-md my-3 text-center">Post ({mockUser.posts_count})</h3>

                        {/* non uso il Feed così posso controllare l'hover sul primo post */}
                        <div className="flex flex-col">
                            {mockUserPosts.map((post, i) => (
                                <div key={post.id}
                                    className={`${i === 0 ? "hover:border-t hover:border-blue-500 border-t border-transparent" : ""}`}>
                                    <PostCard {...post} />
                                    {i < mockUserPosts.length - 1 && (
                                        <Separator className="my-0 bg-gray-400/20" />
                                    )}
                                </div>
                            ))}
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}
