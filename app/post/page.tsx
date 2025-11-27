import NewPostCard from "@/components/organisms/NewPostCard";
import Sidebar from "@/components/organisms/Sidebar";

/* new post */
export default function NewPostPage() {
    return (
        <div className="container max-w-5xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

                <div className="hidden md:block w-72">
                    <Sidebar />
                </div>
                
                <div className="min-h-screen py-6 ">
                    <div className="container mx-4 justify-center items-center w-full">
                        <div className="col w-full">
                            <h2 className="font-bold w-full text-2xl mb-2">Crea un nuovo post</h2>
                            <p className="text-sm my-2 text-gray-400 mb-6">Condividi i tuoi pensieri con la community</p>
                            <NewPostCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
