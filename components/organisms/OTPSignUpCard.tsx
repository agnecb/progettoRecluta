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
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function OTPSignUpCard({
  otpSecret,
  qrCodeUrl,
  onContinue,
}: {
  otpSecret: string;
  qrCodeUrl: string;
  onContinue: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(otpSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl bg-card text-card-foreground border-gray-300/20">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">Registrazione completata! 🎉</CardTitle>
        <CardDescription className="py-0 text-gray-400">
          Configura l'autenticazione a due fattori
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Banner informativo */}
        <div className="p-4 bg-blue-700/20 rounded-lg border border-blue-500">
          <p className="text-sm text-card-foreground">
            <strong>Nota:</strong> Questo progetto usa un secret OTP condiviso
            per tutti gli utenti. Configura Google Authenticator una sola volta
            e potrai accedere con qualsiasi account.
          </p>
        </div>

        {/* Step 1: installazione */}
        <div>
          <h3 className="font-semibold mb-2">Passo 1: Installa Google Authenticator</h3>
          <ul className="list-disc list-inside text-sm text-gray-400">
            <li>
              iPhone:{" "}
              <a
                href="https://apps.apple.com/app/google-authenticator/id388497605"
                target="_blank"
                className="text-blue-500 hover:underline"
              >App Store</a>
            </li>
            <li>
              Android:{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                target="_blank"
                className="text-blue-500 hover:underline"
              >Google Play</a>
            </li>
          </ul>
        </div>

        {/* Step 2: QR */}
        <div>
          <h3 className="font-semibold mb-2">Passo 2: Scansiona il QR Code</h3>

          <div className="flex justify-center my-4">
            <QRCodeCanvas value={qrCodeUrl} size={180} />
          </div>

          <p className="text-sm text-center text-gray-400">
            Oppure inserisci manualmente il secret:
          </p>

          <div className="flex gap-2 mt-1">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300/20 bg-background px-3 py-2 text-sm font-mono"
              readOnly
              value={otpSecret}
            />
            <Button
              type="button"
              className="border border-gray-300/20 bg-gray-900"
              onClick={handleCopy}
            >
              {copied ? "Secret copiato!" : "Copia"}
            </Button>
          </div>
        </div>

      </CardContent>

      <CardFooter>
        <Button className="w-full bg-blue-500" onClick={onContinue}>
          Continua al Login
        </Button>
      </CardFooter>
    </Card>
  );
}
