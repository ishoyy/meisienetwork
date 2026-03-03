'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import WomanVector from "../../../public/img/womanvector.png";
import BGVector from "../../../public/img/communities-bg-vector.png";
import Blob from "../../../public/img/communities-vector-blob.png";
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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { Quicksand } from 'next/font/google';
import Logo from "../../../public/img/home-logo.png";
import { FaHome } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, CheckCircle2Icon, InfoIcon } from "lucide-react";
import { RiAdminFill } from "react-icons/ri";


const quicksand = Quicksand({ subsets: ['latin'] });
import React from 'react'


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password
      });

      if (result.error) {
        setError(result.error.message || "Failed to sign in");
        setLoading(false);
      } else {
        // Keep loading true so button stays disabled during redirect
        setSuccess(true);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Failed to sign in");
      console.log("Login error:", err);
      setLoading(false);
    }
  }

  return (
    <div className={`${quicksand.className} bg-[#F8F6F5]`}>

      <div className="w-full h-full fixed">
      <Image 
        src={BGVector}
        alt="Background Vector"
        layout="fill"
        objectFit="cover"
        className="   -z-20"
      />
      </div>

      <div className="relative">
     
        <div className="flex flex-row items-center gap-2 absolute top-10 left-15 z-10">
          <FaHome
            className="left-6 text-[#4B2E38] hover:text-gray-900 cursor-pointer"
            size={24}
            onClick={() => router.push("/")}
          />
          <Link href="/" className={`${quicksand.className} font-semibold text-xl text-[#4B2E38] hover:text-[#4B2E38] visited:text-[#4B2E38]`}>Back to Home</Link>
        </div>
      </div>
                  <Image src={Blob} alt="Decorative Blob" width={300} height={300} className=" absolute z-3 inset-34 " />

      <div className="min-h-screen flex items-center justify-center p-6">
        
        {/* Shared rounded container with image on the left and form on the right */}
        <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left: decorative image with overlay text - hide on very small screens */}
          <div className="hidden md:flex md:w-[70%] lg:w-[70%] relative overflow-hidden">
            <div className="object-cover w-full h-full bg-white"></div>
          
            {/* Overlay text on top of image */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 ${quicksand.className}`}>
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className="object-cover absolute top-6 left-6 z-10"
              />
              {/* WomanVector centered on top of background */}
              <Image
                src={WomanVector}
                alt="Woman Vector"
                width={300}
                height={300}
                className="object-contain absolute left-1/2 -translate-x-1/2 z-10"
              />
             
            </div>
            <div className="absolute inset-0 flex flex-col  justify-end text-[#4B2E38] text-center p-6 z-20">
             <h2 className="text-3xl font-bold mb-4 z-20 ">Welcome</h2>
              <p className="text-lg font-semibold z-20 ">Sign in to access your admin dashboard.</p>
              </div>
          </div>

          {/* Right: sign-in card */}
          <div className="w-full md:w-1/2 lg:w-3/5 p-8 flex flex-col items-center justify-center z-10 bg-white">
            <Card className="w-full max-w-md shadow-none bg-transparent border-none">
              <div className="flex justify-center flex-col items-center">
                <RiAdminFill className="text-[#4B2E38] mb-4" size={40}></RiAdminFill>
                                <CardTitle className="text-xl font-semibold">Admin</CardTitle>

              </div>
              <CardHeader className="text-center">
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium md:text-sm text-gray-700">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-gray-300 rounded-3xl px-3 py-2 text-sm outline-[#FF0000] focus:ring-2 focus:ring-gray-400"
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
                      className="w-full border border-gray-300 rounded-3xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  {error && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"> {error}</div>
                  )}

                  {success && (<div className="grid w-full max-w-md items-start gap-4">
                    <Alert>
                      <CheckCircle2Icon className="color-green"></CheckCircle2Icon>
                      <AlertTitle className={`quicksand text-[#4B2E38]`}>Login Successful</AlertTitle>
                    </Alert>
                 
                  </div>)}
                  <Button type="submit" className="w-full rounded-3xl bg-[#4B2E38] hover:bg-[#3f2429] focus:ring-2 focus:ring-[#e]" disabled={loading || success}>{loading ? "Loading..." : "Sign In"}</Button>

                </form>
              </CardContent>
              <CardFooter className="justify-center">
              
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm