import { createAuthClient } from "better-auth/react"

// Point the client at the Next.js auth handler route. If you set
// NEXT_PUBLIC_BASE_URL (for example in production), it will be used as the
// origin. Otherwise we use a relative path which works in the browser.
const base = process.env.NEXT_PUBLIC_BASE_URL || ""
const authBaseURL = `${base}/admin/api/auth`

export const authClient = createAuthClient({
    baseURL: authBaseURL,
})

export const { signIn, signUp, useSession, signOut, requestPasswordReset, getSession} = authClient
