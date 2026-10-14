import React from "react";
import { Metadata } from "next";
import { Layers, Sparkles, ShieldCheck } from "lucide-react";
import { CatalogStore } from "@/lib/store/catalogStore";
import { BundleCard } from "@/components/bundles/BundleCard";

export const metadata: Metadata = {
  title: "Curated Sustainable Bundles — Save up to 17% — EARTHLY",
  description:
    "Explore our 4 conscious starter kits: Home Essentials, Travel Essentials, Everyday Reusables, and Conscious Gift Bundles.",
};

export default function BundlesPage() {
  const bundles = CatalogStore.getBundles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A]/15 text-[#425941] text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-[#5B755A]" />
          Conscious Starter Sets
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F]">
          Curated Product Bundles
        </h1>
        <p className="text-sm sm:text-base text-[#5C635E] leading-relaxed">
          Complementary low-waste essentials packaged together at an exclusive bundle savings of up to 17%. Delivered in 100% plastic-free recycled paper packaging.
        </p>
      </div>

      {/* Trust banner */}
      <div className="bg-[#FAF7F2] border border-[#E5DFD4] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-[#202421]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#5B755A]" />
          <span>Calculated bundle discounts automatically applied</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#5B755A]" />
          <span>Includes plastic-free gift-ready packaging</span>
        </div>
        <div>
          <span>Free shipping included on all 4 bundles</span>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {bundles.map((bundle) => (
          <div key={bundle.id} id={bundle.slug} className="scroll-mt-28">
            <BundleCard bundle={bundle} />
          </div>
        ))}
      </div>
    </div>
  );
}
