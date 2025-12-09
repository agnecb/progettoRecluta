// file che serve a estendere i tipi di NextAuth con le proprietà custom (accessToken, requiresOtp, tempToken)
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
        };
        accessToken?: string;
        tempToken?: string;
        requiresOtp?: boolean;
    }

    interface User {
        id: string;
        username: string;
        email: string;
        accessToken?: string;    // JWT finale
        tempToken?: string;      // Token temporaneo step 1
        requiresOtp?: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            username: string;
            email: string;
        };
        accessToken?: string;
        tempToken?: string;
        requiresOtp?: boolean;
    }
}
