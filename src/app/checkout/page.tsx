"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CatalogStore } from "@/lib/store/catalogStore";
import { checkoutSchema, CheckoutFormData } from "@/lib/validations";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, promoCode, shippingFee, total, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.fullName || "Aarav Sharma",
    email: user?.email || "conscious.shopper@earthly.store",
    phone: user?.phone || "+91 98765 43210",
    street: user?.addresses[0]?.street || "Flat 402, Green Meadows, Indiranagar",
    apartment: user?.addresses[0]?.apartment || "",
    city: user?.addresses[0]?.city || "Bengaluru",
    state: user?.addresses[0]?.state || "Karnataka",
    postalCode: user?.addresses[0]?.postalCode || "560038",
    country: "India",
    paymentMethod: "UPI",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoUpiVpa, setDemoUpiVpa] = useState("aarav@okhdfcbank");

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#1D2B1F]">Your cart is empty</h1>
        <p className="text-xs text-[#5C635E]">Please add products before checking out.</p>
        <Link
          href="/shop"
          className="inline-block bg-[#1D2B1F] text-white px-6 py-2.5 rounded-full text-xs font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof CheckoutFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Simulate safe order placement and server recalculation
    setTimeout(() => {
      const newOrder = CatalogStore.createOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          id: `addr-${Date.now()}`,
          fullName: formData.fullName,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          variantName: item.variantName,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        discountAmount,
        discountCode: promoCode?.code,
        shippingFee,
        total,
        status: "Processing",
        payment: {
          method: formData.paymentMethod,
          status: "DemoVerified",
          transactionRef: `DEMO-TX-${Date.now().toString().slice(-8)}`,
        },
      });

      // Clear cart
      clearCart();

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#5B755A", "#849E83", "#E4DCD0", "#1D2B1F"],
        });
      } catch {}

      router.push(`/order-confirmation/${newOrder.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="border-b border-[#E5DFD4] pb-6">
        <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
          Checkout & Conscious Delivery
        </h1>
        <p className="text-xs text-[#5C635E] mt-1">
          Complete your details to arrange carbon-neutral, plastic-free dispatch.
        </p>
      </div>

      {/* Demo Disclosure Banner (Requirement 10) */}
      <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold">Simulated Demo Checkout:</strong>
          <p className="text-amber-800 leading-relaxed">
            Real payments require live Razorpay/Stripe merchant credentials. This demonstrator uses a verified simulated flow. Card numbers and CVVs are strictly client-validated and never stored in any database.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Customer & Shipping Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-[#1D2B1F] flex items-center gap-2 border-b border-[#E5DFD4] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#1D2B1F] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#202421]">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                {errors.fullName && <p className="text-[11px] text-rose-600">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#202421]">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                {errors.phone && <p className="text-[11px] text-rose-600">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-medium text-[#202421]">Email Address (for invoice & tracking) *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-[#1D2B1F] flex items-center gap-2 border-b border-[#E5DFD4] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#1D2B1F] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              Delivery Address (India)
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#202421]">Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="House / Flat no, Building, Street, Area"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                {errors.street && <p className="text-[11px] text-rose-600">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#202421]">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru"
                    className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                  />
                  {errors.city && <p className="text-[11px] text-rose-600">{errors.city}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#202421]">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Karnataka"
                    className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                  />
                  {errors.state && <p className="text-[11px] text-rose-600">{errors.state}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#202421]">PIN Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="e.g. 560038"
                    className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl px-3.5 py-2.5 text-xs text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                  />
                  {errors.postalCode && <p className="text-[11px] text-rose-600">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Options (Demo Mode) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-[#1D2B1F] flex items-center gap-2 border-b border-[#E5DFD4] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#1D2B1F] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              Payment Method
            </h2>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "UPI"
                    ? "border-[#5B755A] bg-[#FAF7F2] ring-1 ring-[#5B755A]"
                    : "border-[#E5DFD4] bg-white hover:border-[#C8BEAF]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={formData.paymentMethod === "UPI"}
                  onChange={handleChange}
                  className="accent-[#5B755A] mt-1"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1D2B1F] flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#5B755A]" />
                      UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </span>
                    <span className="text-[10px] bg-[#5B755A]/15 text-[#425941] px-2 py-0.5 rounded-full font-bold">
                      Recommended
                    </span>
                  </div>
                  {formData.paymentMethod === "UPI" && (
                    <div className="pt-2">
                      <input
                        type="text"
                        value={demoUpiVpa}
                        onChange={(e) => setDemoUpiVpa(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full sm:w-72 bg-white border border-[#E5DFD4] rounded-lg px-3 py-1.5 text-xs text-[#202421]"
                      />
                      <p className="text-[10px] text-[#5C635E] mt-1">
                        Instant simulated UPI authorization.
                      </p>
                    </div>
                  )}
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "Card"
                    ? "border-[#5B755A] bg-[#FAF7F2] ring-1 ring-[#5B755A]"
                    : "border-[#E5DFD4] bg-white hover:border-[#C8BEAF]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={formData.paymentMethod === "Card"}
                  onChange={handleChange}
                  className="accent-[#5B755A] mt-1"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#1D2B1F] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#5B755A]" />
                    Credit / Debit Card (Visa, RuPay, MasterCard)
                  </span>
                  <p className="text-[11px] text-[#5C635E] mt-1">
                    Safe demo simulation. No CVV or card data is ever transmitted or saved.
                  </p>
                </div>
              </label>

              {/* NetBanking */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "NetBanking"
                    ? "border-[#5B755A] bg-[#FAF7F2] ring-1 ring-[#5B755A]"
                    : "border-[#E5DFD4] bg-white hover:border-[#C8BEAF]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="NetBanking"
                  checked={formData.paymentMethod === "NetBanking"}
                  onChange={handleChange}
                  className="accent-[#5B755A] mt-1"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#1D2B1F] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#5B755A]" />
                    NetBanking (50+ Indian Banks)
                  </span>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "COD"
                    ? "border-[#5B755A] bg-[#FAF7F2] ring-1 ring-[#5B755A]"
                    : "border-[#E5DFD4] bg-white hover:border-[#C8BEAF]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                  className="accent-[#5B755A] mt-1"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#1D2B1F] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#5B755A]" />
                    Cash / UPI on Delivery
                  </span>
                  <p className="text-[11px] text-[#5C635E] mt-0.5">
                    Pay at your doorstep via cash or dynamic UPI QR.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm space-y-6 sticky top-28">
          <h2 className="text-lg font-serif font-bold text-[#1D2B1F] border-b border-[#E5DFD4] pb-4">
            Items in Order ({cart.length})
          </h2>

          <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E5DFD4]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1D2B1F] truncate">{item.name}</p>
                  <p className="text-[11px] text-[#5C635E]">Qty: {item.quantity}</p>
                </div>
                <div className="text-right font-serif font-bold text-[#1D2B1F]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-xs text-[#5C635E] border-t border-[#E5DFD4] pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#202421]">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#425941]">
                <span>Discount ({promoCode?.code})</span>
                <span className="font-semibold">-₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Plastic-Free Delivery</span>
              <span className="font-medium text-[#202421]">
                {shippingFee === 0 ? <strong className="text-[#425941]">FREE</strong> : `₹${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-[#1D2B1F] pt-3 border-t border-[#E5DFD4]">
              <span>Final Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1D2B1F] hover:bg-[#2F4232] text-white py-4 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authorizing Conscious Order...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#849E83]" />
                <span>Place Order &bull; ₹{total.toLocaleString("en-IN")}</span>
              </>
            )}
          </button>

          <div className="text-[11px] text-[#5C635E] text-center flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5B755A]" />
            <span>256-Bit SSL Encrypted &bull; Plastic-Free Guarantee</span>
          </div>
        </div>
      </form>
    </div>
  );
}
