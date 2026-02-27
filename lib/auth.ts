import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { getResetPasswordEmailHtml } from "./email-template";
import { FROM_EMAIL, resend } from "./resend";
export const auth = betterAuth({
    database: new Database(process.env.DB_PATH || "./sqlite.db"),
    emailAndPassword: {
        enabled: true,

        // When a reset is requested better-auth provides the `url` (server
        // endpoint under /api/auth/reset-password/<token>) and the raw token.
        // The default flow may POST/redirect through the API route which means
        // the client page (e.g. /admin/reset-password) won't see the token in
        // its query parameters. Build a client-facing link that includes the
        // token as a query param so the client can read it with
        // `useSearchParams().get('token')`.
        sendResetPassword: async ({ user, url, token }) => {
            const appBase = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            const clientLink = `${appBase}/admin/reset-password?token=${encodeURIComponent(token)}`;
            try{
                const emailHtml = getResetPasswordEmailHtml(user.email, clientLink);

                //Send the email using Resend.
                const { data, error } = await resend.emails.send({
                    from: FROM_EMAIL,
                    to: user.email,
                    subject: "Password Reset Request",
                    html: emailHtml,
                })
                console.log("Resend response", {data, error});
            } catch (error) {
                console.error("Error sending password reset email:", error);
                throw new Error("Failed to send reset password email")
            }
            
            
        }


    },
})
