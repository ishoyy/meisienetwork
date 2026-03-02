import { createAuthClient } from "better-auth/react"

// During SSR/prerendering (build time), window is undefined so we need a full URL.
// In the browser, a relative path works fine.
// NEXT_PUBLIC_BASE_URL must be set in Coolify as a build arg too.
const getBaseURL = () => {
    if (typeof window !== "undefined") {
        // Browser — use relative path, always correct regardless of domain
        return `${window.location.origin}/admin/api/auth`;
    }
    // Server/build time — must be a full URL
    return `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admin/api/auth`;
};

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
})

export const { signIn, signUp, useSession, signOut, requestPasswordReset, getSession } = authClient
