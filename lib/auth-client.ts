import { createAuthClient } from "better-auth/react"

// NEXT_PUBLIC_BASE_URL must be set as a build arg in Coolify.
// For local dev it falls back to localhost.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const authClient = createAuthClient({
    baseURL: `${BASE_URL}/admin/api/auth`,
})

export const { signIn, signUp, useSession, signOut, requestPasswordReset, getSession } = authClient
