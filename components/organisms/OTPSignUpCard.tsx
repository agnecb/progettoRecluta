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

export default function OTPSignUpCard({
  otpSecret,
  qrCodeUrl,
  onContinue,
}: {
  otpSecret: string;
  qrCodeUrl: string;
  onContinue: () => void;
}) {
  return (
    <Card className="w-full max-w-2xl bg-card text-card-foreground border-gray-300/20">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">
          Registrazione completata! 🎉
        </CardTitle>
        <CardDescription className="py-0">
          Configura l'autenticazione a due fattori
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Banner informativo */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Nota:</strong> Questo progetto usa un secret OTP condiviso
            per tutti gli utenti. Configura Google Authenticator una sola volta
            e potrai accedere con qualsiasi account.
          </p>
        </div>

        {/* Step 1 */}
        <div>
          <h3 className="font-semibold mb-2">Passo 1: Installa Google Authenticator</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>
              iPhone:{" "}
              <a
                href="https://apps.apple.com/app/google-authenticator/id388497605"
                target="_blank"
                className="text-primary hover:underline"
              >
                App Store
              </a>
            </li>
            <li>
              Android:{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                target="_blank"
                className="text-primary hover:underline"
              >
                Google Play
              </a>
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div>
          <h3 className="font-semibold mb-2">Passo 2: Scansiona il QR Code</h3>

          <div className="flex justify-center my-4">
            <img
              alt="QR Code OTP"
              className="border rounded"
              src={qrCodeUrl}
            />
          </div>

          <p className="text-sm text-center text-muted-foreground">
            Oppure inserisci manualmente il secret:
          </p>

          <label className="text-sm font-medium leading-none">Secret OTP</label>

          <div className="flex gap-2 mt-1">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
              readOnly
              value={otpSecret}
            />
            <Button
              type="button"
              onClick={() => navigator.clipboard.writeText(otpSecret)}
            >
              Copia
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onContinue}>
          Continua al Login
        </Button>
      </CardFooter>
    </Card>
  );
}
