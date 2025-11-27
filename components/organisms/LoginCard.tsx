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

export default function LoginCard() {
  return (
    <Card className="w-full max-w-md bg-card text-card-foreground border-gray-300/20">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">Accedi</CardTitle>
        <CardDescription className="py-0">
          Inserisci le tue credenziali per accedere
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="username" className="bg-background  border-gray-300/20" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="bg-background  border-gray-300/20" required />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600">
          Continua
        </Button>

        <div className="text-center">
          <CardDescription className="py-0">
            Non hai un account?
            <a href="/signup"
              className="px-1 inline-block text-sm underline-offset-4 hover:underline font-bold text-blue-500"
            >
              Registrati
            </a>
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
}
