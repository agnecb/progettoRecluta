// file del provider globale per lo stato dell'utente: tiene traccia di chi è loggato e chi no
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as apiLogout } from "@/services/auth";

interface User {
    id: string;
    username: string;
    email: string;
    bio?: string;
    has_otp?: boolean;
}

interface AuthContextValue {
    user: User | null;
    authToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string, userObj: User) => void;
    logout: () => Promise<void>;
    setUser: (u: User | null) => void;
    refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!authToken;

    function normalizeUser(u: any): User {
        return {
            ...u,
            id: String(u.id),
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                      Recupero sessione da sessionStorage                   */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        const storedToken = sessionStorage.getItem("authToken");
        const storedUser = sessionStorage.getItem("user");

        if (storedToken) setAuthToken(storedToken);
        if (storedUser) setUser(normalizeUser(JSON.parse(storedUser)));

        setLoading(false);
    }, []);

    /* -------------------------------------------------------------------------- */
    /*                  Se abbiamo token ma non user → chiamata /me              */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        async function fetchUser() {
            if (!authToken || user) return;

            try {
                const res = await getMe();
                const normalized = normalizeUser(res.user);
                setUser(normalized);
                sessionStorage.setItem("user", JSON.stringify(normalized));
            } catch (err) {
                console.error("Token non valido, logout.");
                handleLogout();
            }
        }

        fetchUser();
    }, [authToken, user]);

    /* -------------------------------------------------------------------------- */
    /*                                 LOGIN                                      */
    /* -------------------------------------------------------------------------- */
    function login(token: string, userObj: User | any) {
        const normalized = normalizeUser(userObj);

        setAuthToken(token);
        setUser(normalized);

        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("user", JSON.stringify(normalized));
    }

    /* -------------------------------------------------------------------------- */
    /*                                 LOGOUT                                     */
    /* -------------------------------------------------------------------------- */
    async function handleLogout() {
        try {
            await apiLogout();
        } catch (e) {
            console.warn("Logout server failed, continuing");
        }

        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");

        setAuthToken(null);
        setUser(null);
    }
    async function refreshUser(): Promise<User | null> {
        try {
            const res = await getMe();
            const normalized = normalizeUser(res.user);

            setUser(normalized);
            sessionStorage.setItem("user", JSON.stringify(normalized));

            return normalized;   // SEMPRE User, mai undefined
        } catch (err) {
            console.error("refreshUser failed", err);
            setUser(null);
            sessionStorage.removeItem("user");
            return null;         // NON undefined
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            authToken,
            isAuthenticated,
            loading,
            login,
            logout: handleLogout,
            setUser,
            refreshUser
        }}>

            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
