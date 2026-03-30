'use client';

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

const handleSubmit = (e: React.FormEvent) => { };

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    return (
        <div className="min-h-screen  flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>Enter your email and password to log in.</CardDescription>
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
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"> {error}</div>
          )}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Loading..." : "Sign In"}</Button>

          </form>
         
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="text-gray-900 underline underline-offset-2">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
    )
}

export default LoginForm