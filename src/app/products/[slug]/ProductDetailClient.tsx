"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Package,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"transparency" | "maker" | "care">("transparency");
  const [justAdded, setJustAdded] = useState(false);

  const isFav = isFavourite(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.inventoryCount;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      variantName: selectedVariant?.name,
      price: currentPrice,
      quantity,
      image: product.images[activeImageIndex] || product.images[0],
      maxStock: currentStock,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#5C635E]">
        <Link href="/" className="hover:text-[#1D2B1F] transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#1D2B1F] transition">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#1D2B1F] transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1D2B1F] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Gallery (Thumbnails + Main Image) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative border-2 transition ${
                    activeImageIndex === idx
                      ? "border-[#5B755A] shadow-md"
                      : "border-[#E5DFD4] hover:border-[#C8BEAF]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Image */}
          <div className="flex-1 aspect-square rounded-3xl overflow-hidden relative bg-[#F5F2EB] border border-[#E5DFD4] shadow-sm">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestseller && (
                <span className="bg-[#1D2B1F] text-white text-xs uppercase font-bold px-3 py-1 rounded-full shadow-sm">
                  Bestseller
                </span>
              )}
              <span className="bg-[#5B755A] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Plastic-Free
              </span>
            </div>

            {/* Wishlist Toggle Button */}
            <button
              onClick={() => toggleFavourite(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition ${
                isFav
                  ? "bg-rose-50 text-rose-600 scale-105"
                  : "bg-white text-[#202421] hover:text-rose-600"
              }`}
              aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart className={`w-5 h-5 ${isFav ? "fill-rose-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Right: Product Purchase Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#5B755A] uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-[#C8BEAF]">&bull;</span>
              <div className="flex items-center gap-1 text-[#202421]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#5C635E]">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1D2B1F]">
              {product.name}
            </h1>
            <p className="text-sm text-[#5C635E] leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Section */}
          <div className="p-4 bg-white rounded-2xl border border-[#E5DFD4] flex items-baseline justify-between">
            <div>
              <div className="text-[11px] font-medium text-[#5C635E]">Price (Inclusive of all taxes)</div>
              <div className="flex items-baseline gap-3 mt-0.5">
                <span className="text-3xl font-serif font-bold text-[#1D2B1F]">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#5C635E] line-through">
                    ₹{product.compareAtPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  currentStock > 5
                    ? "bg-[#5B755A]/15 text-[#425941]"
                    : currentStock > 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${currentStock > 0 ? "bg-[#5B755A]" : "bg-neutral-500"}`} />
                {currentStock > 0 ? `${currentStock} in stock (Demo)` : "Sold out"}
              </span>
            </div>
          </div>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#5C635E] block">
                Select Option / Finish:{" "}
                <span className="text-[#1D2B1F] font-bold normal-case">
                  {selectedVariant?.name}
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                      selectedVariant?.id === v.id
                        ? "border-[#1D2B1F] bg-[#FAF7F2] ring-1 ring-[#1D2B1F]"
                        : "border-[#E5DFD4] bg-white hover:border-[#C8BEAF]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {v.colorHex && (
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: v.colorHex }}
                        />
                      )}
                      <span className="text-xs font-medium text-[#202421]">
                        {v.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#1D2B1F]">
                      ₹{v.price.toLocaleString("en-IN")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#C8BEAF] rounded-xl bg-white px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-[#5C635E] hover:text-[#202421] transition text-sm font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold text-[#1D2B1F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(currentStock, q + 1))}
                  disabled={quantity >= currentStock}
                  className="px-2 py-1 text-[#5C635E] hover:text-[#202421] disabled:opacity-30 transition text-sm font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={currentStock <= 0 || justAdded}
                className={`flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition ${
                  justAdded
                    ? "bg-[#5B755A] text-white"
                    : currentStock > 0
                    ? "bg-[#1D2B1F] hover:bg-[#2F4232] text-white"
                    : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Your Cart!
                  </>
                ) : currentStock > 0 ? (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart &bull; ₹{(currentPrice * quantity).toLocaleString("en-IN")}
                  </>
                ) : (
                  "Currently Out of Stock"
                )}
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#5C635E]">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF7F2] border border-[#E5DFD4]">
                <Package className="w-4 h-4 text-[#5B755A] shrink-0" />
                <span>100% Plastic-Free Packaging</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF7F2] border border-[#E5DFD4]">
                <Sparkles className="w-4 h-4 text-[#5B755A] shrink-0" />
                <span>Averts {product.impactMetrics.singleUsePlasticAvoidedKg}kg plastic/yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Transparency & Maker Breakdown Tabs */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DFD4] shadow-sm space-y-8">
        <div className="flex border-b border-[#E5DFD4] gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("transparency")}
            className={`pb-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === "transparency"
                ? "border-[#5B755A] text-[#1D2B1F] font-bold"
                : "border-transparent text-[#5C635E] hover:text-[#202421]"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#5B755A]" />
            Materials & Transparency
          </button>
          <button
            onClick={() => setActiveTab("maker")}
            className={`pb-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === "maker"
                ? "border-[#5B755A] text-[#1D2B1F] font-bold"
                : "border-transparent text-[#5C635E] hover:text-[#202421]"
            }`}
          >
            <MapPin className="w-4 h-4 text-[#5B755A]" />
            Origin & Artisan Maker
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`pb-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === "care"
                ? "border-[#5B755A] text-[#1D2B1F] font-bold"
                : "border-transparent text-[#5C635E] hover:text-[#202421]"
            }`}
          >
            <Clock className="w-4 h-4 text-[#5B755A]" />
            Durability & Care
          </button>
        </div>

        {/* Tab 1: Materials & Transparency */}
        {activeTab === "transparency" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#1D2B1F]">
                Verified Material Composition
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                {product.transparency.composition}
              </p>
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5C635E]">
                  Raw Ingredients / Components:
                </span>
                <ul className="space-y-1.5">
                  {product.transparency.materials.map((mat, i) => (
                    <li key={i} className="text-xs text-[#202421] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B755A]" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#1D2B1F]">
                Verified Testing & Certifications
              </h3>
              <div className="space-y-3">
                {product.transparency.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DFD4] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#1D2B1F]">{cert.name}</span>
                      <span className="text-[10px] bg-[#5B755A]/15 text-[#425941] px-2 py-0.5 rounded-full font-bold">
                        Verified
                      </span>
                    </div>
                    <p className="text-[#5C635E]">{cert.statusNote}</p>
                    {cert.verificationAgency && (
                      <p className="text-[10px] text-[#425941] mt-1 font-mono">
                        Auditor: {cert.verificationAgency}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DFD4] text-xs space-y-1">
                <div className="font-semibold text-[#1D2B1F]">Packaging Standard</div>
                <p className="text-[#5C635E]">{product.transparency.packaging.details}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Maker & Origin Story */}
        {activeTab === "maker" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5B755A]">
                <MapPin className="w-4 h-4" />
                <span>Crafted in {product.transparency.origin.region}, {product.transparency.origin.country}</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1D2B1F]">
                {product.transparency.makerStory.name}
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                {product.transparency.makerStory.story}
              </p>
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DFD4] text-xs">
                <span className="font-semibold text-[#1D2B1F]">Community Impact:</span>{" "}
                <span className="text-[#5C635E]">{product.transparency.makerStory.artisanCommunity}</span>
              </div>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD4] space-y-3 flex flex-col justify-center">
              <h4 className="text-sm font-semibold text-[#1D2B1F]">
                Fair Living Wage Commitment
              </h4>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                We independently verify that makers in this facility receive at least 1.4x regional statutory minimum wages, working reasonable hours under clean, ventilated conditions with access to health coverage.
              </p>
              <div className="text-[11px] text-[#425941] font-semibold flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4" /> Fair Wage Audit Passed
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Durability & Care */}
        {activeTab === "care" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#1D2B1F]">
                Durability Testing
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                {product.transparency.durability}
              </p>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DFD4] text-xs">
                <span className="font-semibold text-[#1D2B1F]">Estimated Functional Lifespan:</span>{" "}
                <span className="text-[#5B755A] font-bold">{product.impactMetrics.lifespanYears}+ Years</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#1D2B1F]">
                Care Instructions for Longevity
              </h3>
              <ul className="space-y-2">
                {product.transparency.careInstructions.map((inst, i) => (
                  <li key={i} className="text-xs text-[#202421] flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#5B755A] shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Related Conscious Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-[#E5DFD4] pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1D2B1F]">
                More from {product.category}
              </h2>
              <p className="text-xs text-[#5C635E] mt-0.5">
                Thoughtful companions designed with the same plastic-free philosophy.
              </p>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold text-[#1D2B1F] hover:text-[#5B755A]"
            >
              View Category &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
