"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode("");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#5C635E] mx-auto">
          <ShoppingBag className="w-10 h-10 opacity-60" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
          Your conscious shopping bag is empty
        </h1>
        <p className="text-sm text-[#5C635E] max-w-md mx-auto leading-relaxed">
          Start your plastic-free journey with our tested kitchen jars, insulated bottles, or organic canvas totes.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition shadow-md"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between border-b border-[#E5DFD4] pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
            Conscious Shopping Cart
          </h1>
          <p className="text-xs text-[#5C635E] mt-1">
            {cart.reduce((s, i) => s + i.quantity, 0)} items in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:underline font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert */}
          <div className="p-4 bg-white rounded-2xl border border-[#E5DFD4] text-xs">
            {remainingForFreeShipping === 0 ? (
              <div className="flex items-center gap-2 text-[#425941] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#5B755A]" />
                <span>You have unlocked Free Carbon-Neutral Shipping!</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[#202421]">
                <span>
                  Add <strong>₹{remainingForFreeShipping}</strong> more to qualify for <strong>Free Shipping</strong>.
                </span>
                <Link href="/shop" className="text-[#5B755A] font-semibold hover:underline">
                  Add more &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E5DFD4] p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E5DFD4]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#1D2B1F]">
                      {item.name}
                    </h2>
                    {item.variantName && (
                      <p className="text-xs text-[#5C635E]">{item.variantName}</p>
                    )}
                    <p className="text-sm font-serif font-bold text-[#1D2B1F] mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#E5DFD4] rounded-xl bg-[#FAF7F2]">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:text-[#5B755A] text-[#5C635E] transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#202421]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="p-1.5 hover:text-[#5B755A] text-[#5C635E] disabled:opacity-30 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-serif font-bold text-[#1D2B1F]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#5C635E] hover:text-rose-600 p-1.5 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B755A] hover:text-[#425941]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-6 sticky top-28">
          <h2 className="text-lg font-serif font-bold text-[#1D2B1F] border-b border-[#E5DFD4] pb-4">
            Order Summary
          </h2>

          {/* Promo code */}
          {promoCode ? (
            <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-xl border border-[#849E83]/40 text-xs text-[#425941]">
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
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Promo code (e.g. EARTHLY10)"
                  className="flex-1 bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                <button
                  type="submit"
                  className="bg-[#5B755A] hover:bg-[#425941] text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
            </form>
          )}

          {/* Summary Lines */}
          <div className="space-y-3 text-xs text-[#5C635E] border-t border-[#E5DFD4] pt-4">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-medium text-[#202421]">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#425941]">
                <span>Discount ({promoCode?.code})</span>
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
            <div className="flex justify-between text-base font-serif font-bold text-[#1D2B1F] pt-3 border-t border-[#E5DFD4]">
              <span>Grand Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            className="w-full bg-[#1D2B1F] hover:bg-[#2F4232] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition shadow-md group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="text-[11px] text-[#5C635E] text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5B755A]" />
            <span>Guaranteed zero single-use plastic in packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
}
