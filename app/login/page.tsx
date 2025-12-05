"use client";

import { useState } from "react";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import LoginCard from "@/components/organisms/LoginCard";
import OTPLoginCard from "@/components/organisms/OTPLoginCard";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api";

export default function LoginPage() {
  const [tempToken, setTempToken] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLoginSuccess = async (username: string, password: string) => {
    try {
      // Chiamata login API - submit credentials 
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Errore login");

      if (data.requires_otp) {
        setTempToken(data.temp_token);
        // mostra form OTP e salva data.temp_token per verify step
      } else {
        // Login diretto
        login(data.token, data.user);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleBackToLogin = () => setTempToken(null);

  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen text-foreground bg-background">
        <div className="hidden md:block w-72">
          <AuthSidebar />
        </div>

        <div className="min-h-screen py-6 flex items-center justify-center">
          {tempToken ? (
            <OTPLoginCard
              tempToken={tempToken}
              onBack={handleBackToLogin}
            />
          ) : (
            <LoginCard onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}
