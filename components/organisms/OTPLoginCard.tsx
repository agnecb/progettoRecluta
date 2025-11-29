"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface OTPCardProps {
  tempToken: string | null;
  onBack: () => void;
}

export default function OTPCard({ tempToken, onBack }: OTPCardProps) {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Chiamata API per OTP: invii otp + tempToken
    // Ricevi token di sessione definitivo
    console.log("OTP inviato:", otp, "con token temporaneo:", tempToken);
    // Qui fare redirect / salvare sessione
  };

  return (
    <Card className="w-full max-w-md bg-card text-card-foreground border-gray-300/20">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">Verifica OTP</CardTitle>
        <CardDescription className="py-0">
          Inserisci il codice OTP da Google Authenticator
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="otp_token">Codice OTP</Label>
              <Input
                id="otp_token"
                type="text"
                placeholder="123456"
                className="bg-background border-gray-300/20"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <p className="text-sm text-gray-400">
                Inserisci il codice a 6 cifre da Google Authenticator
              </p>
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600">
              Verifica e accedi
            </Button>

            <Button
              type="button"
              onClick={onBack}
              className="w-full rounded-3xl bg-card hover:bg-background"
            >
              Torna indietro
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
