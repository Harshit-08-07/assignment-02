import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions — EARTHLY",
  description: "Terms of service for purchasing through the EARTHLY sustainable store.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-[#5C635E] leading-relaxed">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
          Terms & Conditions
        </h1>
        <p className="mt-1">Effective Date: October 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DFD4] space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1D2B1F]">1. Store Usage</h2>
          <p>
            By accessing or ordering from EARTHLY, you agree to be bound by these Terms of Service and comply with all applicable laws and regulations in India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1D2B1F]">2. Pricing & Currency</h2>
          <p>
            All listed prices are denominated in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST) as mandated by Indian tax authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1D2B1F]">3. Product Authenticity & Material Accuracy</h2>
          <p>
            We guarantee that all materials described on our product detail pages accurately reflect the verified composition of the item. We do not make false eco-claims or display unverified eco certificates.
          </p>
        </section>
      </div>
    </div>
  );
}
