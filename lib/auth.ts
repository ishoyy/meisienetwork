import { betterAuth } from "better-auth";
import BetterSqlite3 from "better-sqlite3";
import { getResetPasswordEmailHtml } from "./email-template";
import { FROM_EMAIL, resend } from "./resend";
import path from "path";
import fs from "fs";

export function getDb() {
    const dbPath = process.env.DB_PATH || path.join(process.cwd(), "lib", "data", "sqlite.db");
    
    // Ensure the directory exists before opening — works at both build time
    // and runtime regardless of environment (local, Nixpacks, Docker)
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return new BetterSqlite3(dbPath);
}

function createAuth() {
    return betterAuth({
        database: getDb(),
        emailAndPassword: {
            enabled: true,
            sendResetPassword: async ({ user, token }) => {
                const appBase = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
                const clientLink = `${appBase}/admin/reset-password?token=${encodeURIComponent(token)}`;
                try {
                    const emailHtml = getResetPasswordEmailHtml(user.email, clientLink);
                    const { data, error } = await resend.emails.send({
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