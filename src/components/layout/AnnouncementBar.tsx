"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { user, isAdmin, toggleRole } = useAuth();

  if (!isVisible) return null;

  return (
    <div className="bg-[#1D2B1F] text-[#FAF7F2] text-xs font-medium py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#5B755A] text-white text-[10px] tracking-wide uppercase font-semibold">
            Plastic-Free Delivery
          </span>
          <span className="hidden sm:inline text-neutral-300">
            Free carbon-neutral shipping across India on orders over ₹999
          </span>
          <span className="sm:hidden text-neutral-300">
            Free shipping on orders over ₹999
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <Link
            href="/bundles"
            className="underline underline-offset-2 hover:text-[#E4DCD0] transition-colors"
          >
            Save up to 17% on Curated Bundles &rarr;
          </Link>
          
          <button
            onClick={toggleRole}
            className="hidden md:inline-flex items-center gap-1 bg-[#2F4232] hover:bg-[#3D5441] text-[#E4DCD0] px-2 py-0.5 rounded text-[10px] border border-[#5B755A]/40 transition"
            title="Toggle between Customer and Admin role for evaluation"
          >
            <ShieldCheck className="w-3 h-3 text-[#849E83]" />
            Role: <strong className="text-white">{isAdmin ? "Admin" : "Customer"}</strong> (Click to switch)
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close announcement"
            className="text-neutral-400 hover:text-white transition ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
