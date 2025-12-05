import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Tipi possibili dal provider (login o verify OTP)
type AuthUser =
    | { id: string; username: string; email: string; accessToken: string }
    | { tempToken: string; requiresOtp: true };

// Funzioni helper (le tue API)
import { login, verifyOtp } from "@/services/auth"; // percorso corretto al tuo file

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                otpToken: { label: "OTP Token", type: "text" },
                tempToken: { label: "Temporary Token", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                if (credentials.tempToken && credentials.otpToken) {
                    return (await verifyOtp(credentials.tempToken, credentials.otpToken)) as any;
                }
                return (await login(credentials.username, credentials.password)) as any;
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                if ("accessToken" in user) token.accessToken = user.accessToken;
                if ("tempToken" in user) token.tempToken = user.tempToken;
                if ("requiresOtp" in user) token.requiresOtp = user.requiresOtp;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = session.user || { id: "", username: "", email: "" };
            session.accessToken = token.accessToken as string | undefined;
            session.tempToken = token.tempToken as string | undefined;
            session.requiresOtp = token.requiresOtp as boolean | undefined;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
