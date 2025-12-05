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
import { useAuth } from "@/context/AuthContext";
import { verifyOtp } from "@/services/auth";
import { useRouter } from "next/navigation";

interface OTPLoginCardProps {
  tempToken: string;
  onBack: () => void;
}

export default function OTPLoginCard({ tempToken, onBack }: OTPLoginCardProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await verifyOtp(tempToken, otp);

      login(res.token, res.user);
      router.push("/");

    } catch (err: any) {
      alert(err.message || "OTP errato");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md bg-card text-card-foreground border-gray-300/20">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">Verifica OTP</CardTitle>
        <CardDescription className="text-gray-400">
          Inserisci il codice OTP da Google Authenticator
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="otp">Codice OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              className="bg-background border-gray-300/20"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400">
              Inserisci il codice a 6 cifre da Google Authenticator
            </p>
          </div>

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button type="submit" disabled={loading} className="w-full mt-2 rounded-3xl bg-blue-500 hover:bg-blue-600">
              {loading ? "Verifica..." : "Verifica e Accedi"}
            </Button>

            <Button type="button" onClick={onBack} className="w-full rounded-3xl bg-card hover:bg-background">
              Torna indietro
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
