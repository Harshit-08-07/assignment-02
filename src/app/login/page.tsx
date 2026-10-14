"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, toggleRole, isAdmin } = useAuth();
  const [email, setEmail] = useState("conscious.shopper@earthly.store");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    router.push("/account");
  };

  const handleDemoAdmin = async () => {
    setIsLoading(true);
    await login("admin@earthly.store");
    if (!isAdmin) toggleRole();
    setIsLoading(false);
    router.push("/admin");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E5DFD4] shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1D2B1F] text-white flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="w-6 h-6 text-[#849E83]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1D2B1F]">
            Sign in to EARTHLY
          </h1>
          <p className="text-xs text-[#5C635E]">
            Access your orders, saved favourites, and delivery addresses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#202421]">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
              />
              <Mail className="w-4 h-4 text-[#5C635E] absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#202421]">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
              />
              <Lock className="w-4 h-4 text-[#5C635E] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1D2B1F] hover:bg-[#2F4232] text-white py-3 rounded-xl font-semibold text-xs transition shadow-sm flex items-center justify-center gap-2"
          >
            <span>{isLoading ? "Signing in..." : "Sign In to Account"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#E5DFD4] space-y-3 text-center">
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full bg-[#FAF7F2] hover:bg-[#EFE9DE] border border-[#C8BEAF] text-[#1D2B1F] py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5B755A]" />
            <span>Login as Demonstration Store Admin &rarr;</span>
          </button>

          <p className="text-xs text-[#5C635E]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#5B755A] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
