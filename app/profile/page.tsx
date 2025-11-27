import ProfileCard from "@/components/organisms/ProfileCard";
import Sidebar from "@/components/organisms/Sidebar";

/* profile */
export default function ProfilePage() {
  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

        <div className="hidden md:block w-72">
          <Sidebar />
        </div>


        <div className="min-h-screen py-6">
          <div className="container mx-4 justify-center items-center w-full">
            {/* Profilo */}
            <div className="col w-full">
              <h2 className="font-bold w-full text-2xl mb-6">Profilo</h2>
              <ProfileCard />
            </div>


            {/* post/commenti/likes */}



          </div>
        </div>
      </div>
    </div>
  );
}
