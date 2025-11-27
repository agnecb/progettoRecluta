import Sidebar from "@/components/organisms/Sidebar";

/* likes */
export default function LikesPage() {
  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

        <div className="hidden md:block w-72">
          <Sidebar />
        </div>

        <div className="min-h-screen py-6">
          <div className="container mx-4">
            <h2 className="font-bold text-2xl mb-2">I tuoi Mi piace</h2>
            
            {/* likes */}


            {/* se non ha ancora ricevuto nessun like */}
            <div className="flex flex-col flex-1 justify-center items-center text-center mt-6">
              <p className="text-xl my-2 text-gray-400">Ancora nessun like ricevuto </p>
              <p className="text-sm mb-2 text-gray-400">I like che ricevi ai tuoi post appariranno qui.</p>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}
