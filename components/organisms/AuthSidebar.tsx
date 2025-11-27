"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthSidebar() {
  return (
    <div className="hidden md:flex max-w-sm flex-col justify-between min-h-screen p-6 border-r border-gray-300/20">
      
      {/* Parte superiore: titolo + bottoni */}
      <div>
        <h2 className="font-bold text-2xl mb-6">Partecipa alla conversazione</h2>

        <div className="flex flex-col gap-4">
          <Link href="/signup">
            <Button className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600 text-primary-foreground">
              Crea account
            </Button>
          </Link>

          <Link href="/login">
            <Button className="w-full rounded-3xl bg-gray-900 border border-gray-300/20 hover:bg-gray-950">
              Accedi
            </Button>
          </Link>
        </div>
      </div>

      {/* Parte inferiore: link termini e privacy */}
      <div className="flex flex-col gap-2">
        <a href="#" className="text-sm underline-offset-4 hover:underline text-blue-500">
          Termini di servizio
        </a>
        <a href="#" className="text-sm underline-offset-4 hover:underline text-blue-500">
          Informativa sulla privacy
        </a>
      </div>
    </div>
  );
}
