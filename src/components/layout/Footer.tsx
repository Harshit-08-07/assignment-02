"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  ShieldCheck,
  Package,
  RotateCcw,
  Mail,
  ArrowRight,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { newsletterSchema } from "@/lib/validations";

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message || "Invalid email address");
      setNewsletterStatus("error");
      return;
    }

    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmail("");
      setErrorMessage("");
    }, 600);
  };

  return (
    <footer className="bg-[#1D2B1F] text-[#FAF7F2] border-t border-[#2F4232] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Badges Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-14 border-b border-[#2F4232]">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2F4232] text-[#849E83]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Plastic-Free</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-1">
                Recycled kraft paper, paper tape & plant-based void fills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2F4232] text-[#849E83]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Verified Materials</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-1">
                Food-grade 304 steel, FSC bamboo, and lab-tested non-toxic glazes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2F4232] text-[#849E83]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Mindful Returns</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-1">
                14-day hassle-free return window for complete peace of mind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2F4232] text-[#849E83]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Fair Artisan Wages</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-1">
                Direct partnerships with verified Indian craft cooperatives.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-[#2F4232]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#5B755A] flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </span>
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                EARTHLY
              </span>
            </div>
            <p className="text-sm text-[#FAF7F2]/80 font-medium">
              &ldquo;Makes conscious living easier to choose.&rdquo;
            </p>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              We curate enduring, plastic-free alternatives for your home, kitchen, commute, and desk. We publish full material traceability and maker stories on every item — no greenwashing, no unverified certifications.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#849E83] bg-[#2F4232] px-3 py-1.5 rounded-full border border-[#5B755A]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Sustainable Catalog &bull; INR Pricing
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#849E83]">
              Categories
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/70">
              <li><Link href="/shop?category=Reusable+Drinkware" className="hover:text-white transition">Reusable Drinkware</Link></li>
              <li><Link href="/shop?category=Kitchen+Products" className="hover:text-white transition">Kitchen Products</Link></li>
              <li><Link href="/shop?category=Everyday+Essentials" className="hover:text-white transition">Everyday Essentials</Link></li>
              <li><Link href="/shop?category=Home+Essentials" className="hover:text-white transition">Home Essentials</Link></li>
              <li><Link href="/shop?category=Work+and+Stationery" className="hover:text-white transition">Work & Stationery</Link></li>
              <li><Link href="/shop?category=Travel+Accessories" className="hover:text-white transition">Travel Accessories</Link></li>
              <li><Link href="/bundles" className="hover:text-white transition text-[#849E83] font-medium">Curated Bundles</Link></li>
            </ul>
          </div>

          {/* Conscious Guide & Info */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#849E83]">
              Learn & Explore
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/70">
              <li><Link href="/discover" className="hover:text-white transition">Lifestyle Discovery</Link></li>
              <li><Link href="/story" className="hover:text-white transition">Our Story & Manifesto</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ & Materials</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-white transition">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#849E83]">
              Join the Conscious Circle
            </h5>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
              Receive zero-waste living guides, new artisan arrivals, and transparent sourcing notes. Never spam.
            </p>

            {newsletterStatus === "success" ? (
              <div className="p-3 bg-[#2F4232] rounded-xl border border-[#5B755A] text-xs text-[#FAF7F2] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#849E83] shrink-0" />
                <span>Welcome! You will receive our conscious living manifesto shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Enter your email address"
                    className="w-full bg-[#2F4232] border border-[#5B755A]/50 rounded-xl py-2.5 pl-9 pr-24 text-xs text-white placeholder-[#FAF7F2]/50 focus:outline-none focus:ring-1 focus:ring-[#849E83]"
                  />
                  <Mail className="w-4 h-4 text-[#FAF7F2]/60 absolute left-3 top-3" />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="absolute right-1 top-1 bg-[#5B755A] hover:bg-[#849E83] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                  >
                    {newsletterStatus === "loading" ? "..." : "Subscribe"}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-[11px] text-rose-400">{errorMessage}</p>
                )}
              </form>
            )}
            <p className="text-[10px] text-[#FAF7F2]/50">
              By subscribing, you agree to our Privacy Policy and consent to receive email updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-4">
          <p>© {new Date().getFullYear()} EARTHLY. All rights reserved. Crafted with care for conscious living.</p>
          <div className="flex items-center space-x-6 text-xs">
            <span>Currency: <strong>INR (₹)</strong></span>
            <span>Zero Plastic Seal</span>
            <span>Handmade in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
