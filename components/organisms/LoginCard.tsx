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

interface LoginCardProps {
  onLoginSuccess: (username: string, password: string) => Promise<void>;
}

export default function LoginCard({ onLoginSuccess }: LoginCardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await onLoginSuccess(username, password);
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md bg-card text-card-foreground border-gray-300/20">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">Accedi</CardTitle>
        <CardDescription className="py-0">
          Inserisci le tue credenziali per accedere
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                className="bg-background border-gray-300/20"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-background border-gray-300/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full my-4 rounded-3xl bg-blue-500 hover:bg-blue-600"
          >
            {loading ? "Attendere..." : "Continua"}
          </Button>
        </form>

        <CardFooter className="flex-col gap-2 text-center">
          <CardDescription>
            Non hai un account?
            <a
              href="/signup"
              className="px-1 inline-block text-sm underline-offset-4 hover:underline font-bold text-blue-500"
            >
              Registrati
            </a>
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
