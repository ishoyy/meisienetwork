import { Resend } from "resend";

// Initialize Resend with API key

export const resend = new Resend(process.env.RESEND_API_KEY);
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "isha@wouessi.com";
