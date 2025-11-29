"use client";

import { useState } from "react";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import LoginCard from "@/components/organisms/LoginCard";
import OTPLoginCard from "@/components/organisms/OTPLoginCard";

export default function LoginPage() {
  // Stato per il token momentaneo ricevuto dal primo step
  const [tempToken, setTempToken] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    // Ricevi token momentaneo dal login (username/password)
    setTempToken(token);
  };

  const handleBackToLogin = () => {
    // Torna al primo step
    setTempToken(null);
  };

  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">
        
        {/* Sidebar visibile solo su desktop */}
        <div className="hidden md:block w-72">
          <AuthSidebar />
        </div>

        {/* Card di login / OTP */}
        <div className="min-h-screen py-6 flex items-center justify-center">
          {tempToken ? (
            <OTPLoginCard tempToken={tempToken} onBack={handleBackToLogin} />
          ) : (
            <LoginCard onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}
