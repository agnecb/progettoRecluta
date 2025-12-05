"use client";

import { useState } from "react";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import SignUpCard from "@/components/organisms/SignUpCard";
import OTPSignUpCard from "@/components/organisms/OTPSignUpCard";
import { signup } from "@/services/auth";

export default function SignUpPage() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otpSecret, setOtpSecret] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  async function handleSignup(data: { username: string; email: string; password: string }) {
    try {
      const res = await signup(data);

      // Salvo il token JWT per chiamate future
      if (typeof window !== "undefined") {
        sessionStorage.setItem("authToken", res.token);
      }

      // Genero URL per QR code da otpauth://totp/...
      const otpauth = `otpauth://totp/${encodeURIComponent(res.user.username)}?secret=${res.otp_secret}&issuer=JetOp`;

      setOtpSecret(res.otp_secret);
      setQrUrl(otpauth);

      // Passo allo step OTP
      setStep("otp");

    } catch (error: any) {
      alert(error.message || "Errore durante la registrazione");
    }
  }

  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

        {/* Sidebar */}
        <div className="hidden md:block w-72">
          <AuthSidebar />
        </div>

        {/* Contenuto */}
        <div className="min-h-screen py-6 flex items-center justify-center">
          {step === "form" && <SignUpCard onSubmit={handleSignup} />}
          {step === "otp" && (
            <OTPSignUpCard
              otpSecret={otpSecret}
              qrCodeUrl={qrUrl}
              onContinue={() => (window.location.href = "/login")}
            />
          )}
        </div>

      </div>
    </div>
  );
}
