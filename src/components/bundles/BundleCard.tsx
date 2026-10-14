"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Bundle } from "@/types";
import { useCart } from "@/context/CartContext";

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddEntireBundle = () => {
    // Add all bundled products to cart
    bundle.items.forEach((item) => {
      // Proportionally apply bundle discount to individual items
      const discountedItemPrice = Math.round(
        item.individualPrice * (1 - bundle.discountPercentage / 100)
      );

      addToCart({
        productId: item.productId,
        name: `${item.productName} (from ${bundle.name})`,
        price: discountedItemPrice,
        quantity: item.quantity,
        image: item.image,
        maxStock: 20,
        isBundle: true,
        bundleId: bundle.id,
      });
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const savingsAmount = bundle.regularPrice - bundle.bundlePrice;

  return (
    <div className="earthly-card overflow-hidden bg-white flex flex-col justify-between p-6 sm:p-7 relative border border-[#E5DFD4]">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A]/15 text-[#425941] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#5B755A]" />
          Save {bundle.discountPercentage}% (₹{savingsAmount.toLocaleString("en-IN")})
        </span>
        <span className="text-xs text-[#5C635E] font-medium">
          {bundle.items.length} Curated Items
        </span>
      </div>

      {/* Main Info */}
      <div className="space-y-2 mb-6">
        <Link href={`/bundles#${bundle.slug}`} className="hover:text-[#5B755A] transition">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1D2B1F]">
            {bundle.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-[#5C635E] leading-relaxed">
          {bundle.tagline}
        </p>
      </div>

      {/* Included Products List */}
      <div className="space-y-3 mb-6 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DFD4]">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C635E] mb-1">
          Included in this bundle:
        </div>
        {bundle.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden relative shrink-0 border border-[#E5DFD4] bg-white">
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <span className="font-medium text-[#202421] line-clamp-1">
                {item.quantity}x {item.productName}
              </span>
            </div>
            <span className="text-[#5C635E] shrink-0 font-medium line-through">
              ₹{item.individualPrice.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing and Action */}
      <div className="pt-4 border-t border-[#E5DFD4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#5C635E]">Bundle Total</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-[#1D2B1F]">
              ₹{bundle.bundlePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-[#5C635E] line-through">
              ₹{bundle.regularPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddEntireBundle}
          disabled={justAdded}
          className={`px-6 py-3 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition ${
            justAdded
              ? "bg-[#5B755A] text-white"
              : "bg-[#1D2B1F] hover:bg-[#2F4232] text-white"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" /> Bundle Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add Entire Bundle to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
