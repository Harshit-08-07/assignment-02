import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — EARTHLY",
  description: "How EARTHLY protects and handles your personal data with complete transparency.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-[#5C635E] leading-relaxed">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
          Privacy Policy
        </h1>
        <p className="mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DFD4] space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1D2B1F]">1. Information We Collect</h2>
          <p>
            When you browse our catalog, make a purchase, or create an account, we collect necessary personal details such as your full name, email address, contact phone number, and physical shipping address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1D2B1F]">2. Payment Information Security</h2>
          <p>
            EARTHLY never stores your payment card numbers, CVVs, or bank netbanking passwords. All transactions are routed directly through PCI-DSS compliant payment gateways with bank-grade encryption.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1D2B1F]">3. We Never Sell Your Data</h2>
          <p>
            We strictly do not sell, rent, or trade your personal information with third-party advertising brokers or data harvesters. Your details are used solely to fulfill your orders and deliver your conscious choices.
          </p>
        </section>
      </div>
    </div>
  );
}
