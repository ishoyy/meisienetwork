'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Logo from "../../../public/img/home-logo.png";
import Image from "next/image";
import { Quicksand } from 'next/font/google';
import HomeVector from "../../../public/img/home-vector.png";
const quicksand = Quicksand({ subsets: ['latin'] });

const page = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // useSession is a React hook — must be called inside the component
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);
        try {
            const result = await authClient.requestPasswordReset({
                email,
                redirectTo: "/admin/reset-password"
            });

            if (result.error) {
                setError(result.error.message || "Failed to send reset link");
            } else {
                setSuccess(true);
            }

        } catch (error) {
            setError("Failed to send reset link");
            console.error("Forgot password error:", error)
        } finally {
            setLoading(false);
        }
    };

    // Show nothing while session is loading
    if (isPending) return null;

    // Block access if not signed in
    if (!session) {
        return (
            <div className={`${quicksand.className} min-h-screen flex items-center justify-center bg-[#F8F6F5]`}>
                <p className="text-gray-500">You are not authorized to view this page. <Link href="/admin/login" className="text-[#4B2E38] underline">Sign in</Link></p>
            </div>
        );
    }

    return (
        <div className={`${quicksand.className} bg-[#F8F6F5]`}>
            <Image src={HomeVector} alt="Home Vector" width={300} height={60} className="absolute top-0 left-0 z-0 pointer-events-none" />
            <Image src={Logo} alt="Meisie Logo" width={150} height={150} className="absolute top-15 left-25" />
            <div className="min-h-screen flex gap-2 flex-col items-center justify-center">


                {success ? (
                    <div className="space-y-4">
                        <Alert>
                            <AlertTitle className="font-bold">Password Reset Link Sent</AlertTitle>
                            <AlertDescription>
                                A password reset link has been sent to: {email}. Please check your email.
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <Card className="w-full max-w-sm shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">Reset Password</CardTitle>
                            <CardDescription>Enter your email to receive a password reset link</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full border border-gray-300 rounded-3xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                                    />
                                </div>
                                {error && (
                                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
                                )}
                                <Button type="submit" className="w-full rounded-3xl text-white bg-[#4B2E38] hover:bg-[#3f2429]" disabled={loading}>
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>
                                <Button type="button" variant="outline" className="w-full bg-transparent rounded-3xl" onClick={() => router.push("/admin/login")}>
                                    Back to Login
                                </Button>
                            </form>

                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default page;