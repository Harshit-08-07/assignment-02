"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1D2B1F]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E5DFD4] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E5DFD4] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#5B755A]" />
              <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
                Your Conscious Cart
              </h2>
              <span className="text-xs bg-[#FAF7F2] text-[#5C635E] px-2 py-0.5 rounded-full font-medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-[#5C635E] hover:text-[#202421] hover:bg-[#FAF7F2] transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-[#FAF7F2] border-b border-[#E5DFD4] text-xs">
            <div className="flex justify-between font-medium text-[#202421] mb-1.5">
              <span>
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#425941] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Unlocked: Free Carbon-Neutral Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong>₹{remainingForFreeShipping}</strong> more for <strong>Free Shipping</strong>
                  </span>
                )}
              </span>
              <span className="text-[#5C635E]">{progressPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E5DFD4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5B755A] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#5C635E] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-base font-semibold text-[#202421]">Your cart is empty</h3>
                <p className="text-sm text-[#5C635E] max-w-xs mt-1 mb-6">
                  Explore our verified sustainable essentials and start your low-waste journey.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E5DFD4] relative group"
                >
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E5DFD4]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-[#202421] line-clamp-1">
                        {item.name}
                      </h4>
                      {item.variantName && (
                        <p className="text-xs text-[#5C635E]">{item.variantName}</p>
                      )}
                      <p className="text-sm font-semibold text-[#1D2B1F] mt-0.5">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E5DFD4] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-[#5B755A] text-[#5C635E] transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#202421]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:text-[#5B755A] text-[#5C635E] disabled:opacity-30 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#5C635E] hover:text-rose-600 transition p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E5DFD4] bg-white space-y-4">
              {/* Promo code form */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded-lg border border-[#849E83]/40 text-xs text-[#425941]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{promoCode.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. EARTHLY10)"
                    className="flex-1 bg-[#FAF7F2] border border-[#E5DFD4] rounded-lg px-3 py-2 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                  />
                  <button
                    type="submit"
                    className="bg-[#5B755A] hover:bg-[#425941] text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C635E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#202421]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#425941]">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -₹{discountAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Plastic-Free Delivery</span>
                  <span className="font-medium text-[#202421]">
                    {shippingFee === 0 ? (
                      <strong className="text-[#425941]">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1D2B1F] pt-2 border-t border-[#E5DFD4]">
                  <span>Total (INR)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-[#1D2B1F] hover:bg-[#2F4232] text-[#FAF7F2] py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition shadow-md group"
                >
                  <span>Proceed to Safe Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5C635E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5B755A]" />
                  <span>100% Secure Checkout | Safe Demo Gateway</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
