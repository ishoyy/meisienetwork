'use client';

import { authClient} from "@/lib/auth-client";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminIcon from "../../../public/img/admin-icon.png";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        setError("")


        if (password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8){
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);
        try{
            const result = await authClient.signUp.email({
                email,
                name: "Admin",
                password
            });

            if (result.error){
                setError(result.error.message || "Failed to sign up");
            } else {
               setTimeout(() => {
                    router.push("/admin/login");
                }, 2000);
            }
        }catch(err){
            setError("Failed to sign up");
        } finally{
        setLoading(false);
        }

    }

    return (
        <div>
            <div className="min-h-screen  flex items-center justify-center">
                <Card className="w-full max-w-sm shadow-sm">
                        {/* Centered admin icon */}
                        <div className="flex justify-center mt-6">
                            <Image
                                src={AdminIcon}
                                alt="Admin icon"
                                width={72}
                                height={72}
                                className="rounded-full"
                            />
                        </div>
                    <CardHeader>
                        <CardTitle className="text-xl">Sign in</CardTitle>
                        <CardDescription>Enter your email and password to create a new account.</CardDescription>
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
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
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
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            {error && (
                                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"> {error}</div>
                            )}
                            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</Button>

                        </form>

                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link href="/admin/login" className="text-blue-500 hover:underline">Sign In</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default page;