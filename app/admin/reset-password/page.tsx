'use client';

import { authClient } from "@/lib/auth-client";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import React from 'react'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Quicksand } from "next/font/google";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, CheckCircle2Icon, InfoIcon } from "lucide-react";
import Image from "next/image";
import HomeVector from "../../../public/img/home-vector.png";
import Logo from "../../../public/img/home-logo.png";
const quicksand = Quicksand({ subsets: ['latin'] });


function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    console.log("Token from URL:", token);

    useEffect(() => {
        const tokenParam = searchParams.get("token");

        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setError("Invalid or missing reset token");
        }
    }, [searchParams]);

    // Log token when it changes (it will be `null` on first render until we set it)
    useEffect(() => {
        console.log("reset-password: token state =", token);
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")


        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (!token) {
            setError("Invalid or missing reset token");
            return;
        }

        setLoading(true);
        try {
            const result = await authClient.resetPassword({
                newPassword: password,
                token: token,

            })

            if (result.error) {
                setError(result.error.message || "Failed to reset password");
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/admin/login");
                }, 2000);
            }
        } catch (err) {
            setError("Failed to reset password");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className={`${quicksand.className} bg-[#F8F6F5]`}>
            <Image src={HomeVector} alt="Home Vector" width={300} height={60} className="absolute top-0 left-0 z-0 pointer-events-none" />
            <Image src={Logo} alt="Meisie Logo" width={150} height={150} className="absolute top-15 left-25" />
            <div className="min-h-screen  flex items-center justify-center">
                <Card className="w-full max-w-sm shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Reset Password</CardTitle>
                        <CardDescription>Enter your new password to reset your password.</CardDescription>
                    </CardHeader>
                    {success && (<div className="grid w-full max-w-md items-start p-4 gap-4">
                        <Alert>
                            <CheckCircle2Icon className="color-green"></CheckCircle2Icon>
                            <AlertTitle className={`quicksand text-[#4B2E38]`}>Your password has been successfully reset!</AlertTitle>
                        </Alert>

                    </div>)}                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">New Password</label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={!token}
                                    className="w-full border border-gray-300 rounded-3xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                <Input
                                    type="password"
                                    id="confirmpassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={!token}
                                    className="w-full border border-gray-300 rounded-3xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            {error && (
                                <div className="rounded-3xl bg-destructive/10 p-3 text-sm text-destructive"> {error}</div>
                            )}
                            <Button type="submit" className="w-full rounded-3xl text-white bg-[#4B2E38] hover:bg-[#3f2429] focus:ring-2 focus:ring-[#e]" disabled={loading || !token}>{loading ? "Resetting..." : "Reset Password"}</Button>
                            <Button type="button" variant="outline" className="w-full bg-transparent rounded-3xl" onClick={() => router.push("/admin/login")}>
                                Back to Login
                            </Button>
                        </form>

                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}