"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// hook per evitare l'accesso di un utente non loggato a pagine che necessitano autenticazione
/* Quando una pagina chiama useRequireAuth():
 *  - Aspetta che AuthProvider finisca di recuperare token/sessione (loading === false)
 *  - Se NON sei loggato → router.replace("/login")
 *  - Se sei loggato → ritorna l’oggetto user, già normalizzato
*/
export function useRequireAuth(redirectTo: string = "/login") {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return; // aspetta inizializzazione AuthProvider

        if (!isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [loading, isAuthenticated, router, redirectTo]);

    return user;
}
