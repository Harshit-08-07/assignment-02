import React from "react";
import { Metadata } from "next";
import { Truck, RotateCcw, Package, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Conscious Shipping & Returns — EARTHLY",
  description: "Learn about our 100% plastic-free packaging, carbon-neutral shipping, and 14-day mindful return policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-xs text-[#5C635E] leading-relaxed">
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#5B755A]">
          Transparent Fulfillment
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F]">
          Shipping & Mindful Returns Policy
        </h1>
        <p className="text-sm">
          Effective date: October 2026 &bull; Nationwide Carbon-Neutral Indian Logistics
        </p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DFD4]">
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-[#1D2B1F] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#5B755A]" />
            1. Carbon-Neutral Shipping Across India
          </h2>
          <p>
            We process all orders within 24–48 business hours from our Bengaluru dispatch studio. Delivery timeframes typically range from 2 to 5 business days across Indian tier 1 and tier 2 cities.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Orders above <strong>₹999</strong>: <strong>FREE Carbon-Neutral Shipping</strong></li>
            <li>Orders below ₹999: Flat rate of <strong>₹99</strong> nationwide</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-[#E5DFD4]">
          <h2 className="text-base font-serif font-bold text-[#1D2B1F] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#5B755A]" />
            2. The 100% Plastic-Free Packaging Standard
          </h2>
          <p>
            Every EARTHLY order is securely packed without synthetic bubble wrap, thermocol, or plastic adhesive tape. We use biodegradable paper honeycomb sleeves, unbleached kraft boxes, and cornstarch gummed paper tape.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-[#E5DFD4]">
          <h2 className="text-base font-serif font-bold text-[#1D2B1F] flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#5B755A]" />
            3. Mindful 14-Day Returns & Exchanges
          </h2>
          <p>
            If a product does not suit your everyday needs, you may request a return within 14 days of delivery provided the item is unused, unwashed, and in its original paper packaging.
          </p>
          <p>
            In the rare event of transit damage or manufacturing imperfections, simply reach out to <strong>care@earthly.store</strong> with a photograph and our team will issue an immediate replacement at zero cost.
          </p>
        </section>
      </div>
    </div>
  );
}
