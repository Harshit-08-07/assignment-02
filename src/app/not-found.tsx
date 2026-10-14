import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EFE9DE] text-[#5B755A] flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B755A]">
            Page Not Found &bull; 404
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
            This conscious path leads elsewhere
          </h1>
          <p className="text-xs text-[#5C635E] leading-relaxed">
            The page you are looking for may have been relocated, discontinued, or renamed. Let&apos;s guide you back to our sustainable collection.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-6 py-3 rounded-full text-xs font-semibold transition flex items-center gap-2 shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/shop"
            className="bg-white border border-[#C8BEAF] hover:bg-[#FAF7F2] text-[#202421] px-6 py-3 rounded-full text-xs font-semibold transition flex items-center gap-2"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
