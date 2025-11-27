import AuthSidebar from "@/components/organisms/AuthSidebar";
import SignUpCard from "@/components/organisms/SignUpCard";

export default function SignUpPage() {
  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">

        <div className="hidden md:block w-72">
          <AuthSidebar />
        </div>

        <div className="min-h-screen py-6 flex items-center">
          <div className="container mx-4 flex justify-center">
            <SignUpCard />
          </div>

        </div>
      </div>
    </div>


  );
}

