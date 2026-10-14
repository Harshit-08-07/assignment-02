"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Heart,
  Home,
  Plane,
  UtensilsCrossed,
  Briefcase,
  Compass,
  Gift,
  ShieldCheck,
  Check,
} from "lucide-react";
import { CatalogStore } from "@/lib/store/catalogStore";
import { LifestyleRecommendation } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const INTEREST_OPTIONS = [
  { id: "Everyday Essentials", label: "Everyday Essentials", icon: Compass, desc: "Totes, daily reusables & daily carry" },
  { id: "Kitchen", label: "Kitchen & Dining", icon: UtensilsCrossed, desc: "Airtight storage, wooden ladles & beeswax wraps" },
  { id: "Travel", label: "Travel & Commute", icon: Plane, desc: "Leakproof bottles, organizers & solid toiletries" },
  { id: "Home", label: "Conscious Home", icon: Home, desc: "Soy candles, organic throws & linen" },
  { id: "Work", label: "Mindful Workspace", icon: Briefcase, desc: "Bamboo stationery & cork laptop accessories" },
  { id: "Gifting", label: "Curated Gifting", icon: Gift, desc: "Plastic-free sustainable starter kits" },
];

const SUSTAINABLE_GOALS = [
  "Eliminate daily single-use plastics and packaging",
  "Transition to non-toxic, lab-tested food contact materials",
  "Upgrade workspace and home with natural organic fibers",
  "Zero-waste travel and commute efficiency",
];

export default function DiscoverPage() {
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useWishlist();

  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Everyday Essentials", "Kitchen"]);
  const [selectedGoal, setSelectedGoal] = useState<string>(SUSTAINABLE_GOALS[0]);
  const [results, setResults] = useState<LifestyleRecommendation[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const handleInterestToggle = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const handleRunDiscovery = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const recs = CatalogStore.discoverRecommendations(selectedInterests, selectedGoal);
      setResults(recs);
      setIsAnalyzing(false);
    }, 450);
  };

  const handleQuickAdd = (product: any) => {
    const defaultVariant = product.variants[0];
    addToCart({
      productId: product.id,
      variantId: defaultVariant?.id,
      name: product.name,
      variantName: defaultVariant?.name,
      price: defaultVariant ? defaultVariant.price : product.price,
      quantity: 1,
      image: product.images[0],
      maxStock: defaultVariant ? defaultVariant.stock : product.inventoryCount,
    });

    setAddedItemIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="max-w-3xl text-left space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A]/15 text-[#425941] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#5B755A]" />
          Intelligent Lifestyle Matching
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F]">
          Discover What Fits Your Daily Routine
        </h1>
        <p className="text-sm sm:text-base text-[#5C635E] leading-relaxed">
          Tell us about where you spend your time and what eco-habits you want to build. We will compute the highest-impact plastic-free essentials for your exact lifestyle, complete with verified rationale.
        </p>
      </div>

      {/* Discovery Input Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DFD4] shadow-sm space-y-8">
        {/* Step 1: Lifestyle Areas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1D2B1F]">
              Step 1: Choose Your Active Lifestyle Interests
            </h2>
            <span className="text-xs text-[#5C635E]">
              Select 1 or more areas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTEREST_OPTIONS.map((opt) => {
              const isSelected = selectedInterests.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleInterestToggle(opt.id)}
                  className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 ${
                    isSelected
                      ? "border-[#5B755A] bg-[#FAF7F2] ring-2 ring-[#5B755A]/30 shadow-xs"
                      : "border-[#E5DFD4] bg-white hover:border-[#C8BEAF]"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected
                        ? "bg-[#5B755A] text-white"
                        : "bg-[#FAF7F2] text-[#5C635E]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1D2B1F]">
                      {opt.label}
                    </h3>
                    <p className="text-xs text-[#5C635E] mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Primary Goal */}
        <div className="space-y-4 pt-6 border-t border-[#E5DFD4]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1D2B1F]">
            Step 2: What Is Your Primary Sustainable Priority?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUSTAINABLE_GOALS.map((goal, idx) => (
              <label
                key={idx}
                className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition flex items-center gap-3 ${
                  selectedGoal === goal
                    ? "border-[#1D2B1F] bg-[#FAF7F2] font-semibold text-[#1D2B1F]"
                    : "border-[#E5DFD4] bg-white text-[#5C635E] hover:border-[#C8BEAF]"
                }`}
              >
                <input
                  type="radio"
                  name="sustainableGoal"
                  checked={selectedGoal === goal}
                  onChange={() => setSelectedGoal(goal)}
                  className="accent-[#5B755A] w-4 h-4"
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5DFD4]">
          <div className="text-xs text-[#5C635E]">
            {selectedInterests.length} areas selected &bull; Algorithmic transparent matching
          </div>

          <button
            onClick={handleRunDiscovery}
            disabled={isAnalyzing}
            className="w-full sm:w-auto bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition shadow-md flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <span>Analyzing Sustainable Catalog...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#849E83]" />
                <span>Compute Recommendations</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Discovery Results Section */}
      {results && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5DFD4] pb-4 gap-2">
            <div>
              <div className="text-xs font-semibold text-[#5B755A] uppercase tracking-wider">
                Personalized Matches
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1D2B1F] mt-1">
                Your Conscious Living Lineup ({results.length} items)
              </h2>
            </div>
            <button
              onClick={() => {
                setResults(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xs text-[#5C635E] hover:text-[#1D2B1F] flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Adjust Preferences
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(({ product, relevanceReason, matchScore }) => {
              const isFav = isFavourite(product.id);
              const isAdded = addedItemIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="earthly-card bg-white p-5 flex flex-col justify-between border border-[#E5DFD4] relative"
                >
                  <div>
                    {/* Image & Match Pill */}
                    <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#FAF7F2] mb-4 border border-[#E5DFD4]">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-[#1D2B1F] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#849E83]" />
                        {matchScore * 10}% Lifestyle Match
                      </div>
                      <button
                        onClick={() => toggleFavourite(product.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-sm ${
                          isFav ? "bg-rose-50 text-rose-600" : "bg-white/80 text-[#202421]"
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-rose-600" : ""}`} />
                      </button>
                    </div>

                    {/* Product Name & Price */}
                    <div className="space-y-1 mb-3">
                      <div className="text-[11px] font-semibold text-[#5B755A]">
                        {product.category}
                      </div>
                      <Link href={`/products/${product.slug}`} className="hover:text-[#5B755A]">
                        <h3 className="text-base font-semibold text-[#1D2B1F] line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="text-sm font-serif font-bold text-[#1D2B1F]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Explanatory Rationale Box (Requested in Requirement 7) */}
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#849E83]/30 text-xs text-[#202421] space-y-1 mb-4">
                      <div className="font-semibold text-[#425941] flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5B755A]" />
                        Why this matches you:
                      </div>
                      <p className="text-[#5C635E] leading-relaxed text-[11px]">
                        {relevanceReason}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#E5DFD4] flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isAdded}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition ${
                        isAdded
                          ? "bg-[#5B755A] text-white"
                          : "bg-[#1D2B1F] hover:bg-[#2F4232] text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                        </>
                      )}
                    </button>

                    <Link
                      href={`/products/${product.slug}`}
                      className="px-3 py-2.5 rounded-xl text-xs font-semibold border border-[#E5DFD4] hover:bg-[#FAF7F2] text-[#202421] transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
