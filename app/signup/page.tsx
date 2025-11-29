"use client";

import { useState } from "react";
import AuthSidebar from "@/components/organisms/AuthSidebar";
import SignUpCard from "@/components/organisms/SignUpCard";
import OTPSignUpCard from "@/components/organisms/OTPSignUpCard";

export default function SignUpPage() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otpSecret, setOtpSecret] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  async function handleSignup(data: any) {
    try {
      // 1) Registrazione utente
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Errore in registrazione");
      }

      // 2) Genero OTP QR per l'utente appena creato
      const otpRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/otp/setup`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const otpJson = await otpRes.json();

      setOtpSecret(otpJson.secret);
      setQrUrl(otpJson.otpauth_url);

      // passo allo step 2
      setStep("otp");
    } catch (error) {
      console.error(error);
      alert("Registrazione fallita");
    }
  }

  return (
    <div className="container max-w-5xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 min-h-screen">

        {/* Sidebar */}
        <div className="hidden md:block w-72">
          <AuthSidebar />
        </div>

        {/* Form o OTP step */}
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
