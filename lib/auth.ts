import { betterAuth, isProduction } from "better-auth";
import BetterSqlite3 from "better-sqlite3";
import { getResetPasswordEmailHtml } from "./email-template";
import { FROM_EMAIL, getResend } from "./resend";
import path from "path";
import fs from "fs";

// Singleton DB connection — only opened once per process
let dbInstance: InstanceType<typeof BetterSqlite3> | null = null;

export function getDb() {
    if (dbInstance) return dbInstance;

    const dbPath = process.env.DB_PATH || path.join(process.cwd(), "lib", "data", "sqlite.db");
    
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    dbInstance = new BetterSqlite3(dbPath);
    return dbInstance;
}

function createAuth() {
    // BETTER_AUTH_URL is the server-side base URL — set in Coolify runtime env vars
    // NEXT_PUBLIC_BASE_URL is baked into the client bundle at build time
    // Use BETTER_AUTH_URL for all server-side logic
    const appBase = process.env.BETTER_AUTH_URL || 
                    process.env.NEXT_PUBLIC_BASE_URL || 
                    "http://localhost:3000";

    return betterAuth({
        database: getDb(),
        trustedOrigins: [appBase],
        baseURL: appBase,
         advanced: {
            useSecureCookies: isProduction,
            cookiePrefix: "meisie",
            crossSubDomainCookies: {
                enabled: false,
            },
        },
        emailAndPassword: {
            enabled: true,
            sendResetPassword: async ({ user, token }) => {
                const clientLink = `${appBase}/admin/reset-password?token=${encodeURIComponent(token)}`;
                try {
                    const emailHtml = getResetPasswordEmailHtml(user.email, clientLink);
                    const { data, error } = await getResend().emails.send({
                        from: FROM_EMAIL,
                        to: user.email,
                        subject: "Password Reset Request",
                        html: emailHtml,
                    });
                    console.log("Resend response", { data, error });
                } catch (error) {
                    console.error("Error sending password reset email:", error);
                    throw new Error("Failed to send reset password email");
                }
            }
        },
    });
}

export const auth = createAuth();