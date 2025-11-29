import { apiFetch } from "../lib/api"; // oppure usa fetch nativo

const BASE = process.env.NEXT_PUBLIC_API_URL;

/* --------------------------
    SIGNUP STEP 1 
   /auth/register
-------------------------- */
export async function registerUser({ username, email, password }) {
    return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
    });
}

/* --------------------------
    SIGNUP STEP 2 
    /auth/otp/setup
-------------------------- */
export async function setupOtp() {
    return apiFetch("/auth/otp/setup", {
        method: "GET",
    });
}

/* --------------------------
   LOGIN STEP 1 
   /auth/login
-------------------------- */
export async function loginUser({ username, password }) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
}

/* --------------------------
   LOGIN STEP 2 
   /auth/verify-otp
-------------------------- */
export async function verifyOtp({ temp_token, otp_token }) {
    return apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ temp_token, otp_token }),
    });
}

/* --------------------------
   /auth/logout
-------------------------- */
export async function logoutUser() {
    return apiFetch("/auth/logout", {
        method: "POST",
    });
}

/* --------------------------
   /auth/me
-------------------------- */
export async function getMe() {
    return apiFetch("/auth/me", {
        method: "GET",
    });
}
