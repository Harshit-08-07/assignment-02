"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Lock, Mail, User, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await register(fullName, email, password);
    setIsLoading(false);
    router.push("/account");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E5DFD4] shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1D2B1F] text-white flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="w-6 h-6 text-[#849E83]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1D2B1F]">
            Join EARTHLY
          </h1>
          <p className="text-xs text-[#5C635E]">
            Create an account to join the conscious living community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#202421]">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="e.g. Diya Sen"
                className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
              />
              <User className="w-4 h-4 text-[#5C635E] absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#202421]">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
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
                placeholder="At least 6 characters"
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
            <span>{isLoading ? "Creating Account..." : "Create Conscious Account"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#E5DFD4] text-center">
          <p className="text-xs text-[#5C635E]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#5B755A] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
