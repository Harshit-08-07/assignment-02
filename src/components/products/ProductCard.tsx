"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Check, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFav = isFavourite(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleFavToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(product.id);
  };

  return (
    <div
      className="earthly-card group flex flex-col overflow-hidden bg-white relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EB]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#1D2B1F] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#5B755A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Save {discountPercent}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-neutral-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleFavToggle}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-sm z-10 ${
            isFav
              ? "bg-rose-50 text-rose-600 scale-105"
              : "bg-white/80 hover:bg-white text-[#202421] hover:text-rose-600 backdrop-blur-xs"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-rose-600 text-rose-600" : ""}`} />
        </button>

        {/* Quick Add To Cart Button (appears on hover) */}
        {product.inStock && (
          <div className="absolute bottom-3 inset-x-3 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
            <button
              onClick={handleQuickAdd}
              disabled={justAdded}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition ${
                justAdded
                  ? "bg-[#5B755A] text-white"
                  : "bg-[#1D2B1F] hover:bg-[#2F4232] text-white"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#5C635E] mb-1">
            <span className="font-medium">{product.category}</span>
            <div className="flex items-center gap-1 text-[#202421]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`} className="block group-hover:text-[#5B755A] transition-colors">
            <h3 className="text-sm font-semibold text-[#1D2B1F] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#5C635E] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-[#E5DFD4]/70 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-serif font-bold text-[#1D2B1F]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#5C635E] line-through">
                ₹{product.compareAtPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] text-[#5B755A] bg-[#5B755A]/10 px-2 py-0.5 rounded-full font-medium">
            <ShieldCheck className="w-3 h-3" />
            <span>Plastic-Free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
