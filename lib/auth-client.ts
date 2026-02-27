import { createAuthClient } from "better-auth/react"

// Use a relative path so it always points to the same origin the browser
// is on — works in both local dev and any deployed environment without
// needing NEXT_PUBLIC_BASE_URL to be baked in at build time.
export const authClient = createAuthClient({
    baseURL: "/admin/api/auth",
})

export const { signIn, signUp, useSession, signOut, requestPasswordReset, getSession} = authClient
