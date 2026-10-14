import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  Calendar,
  Printer,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CatalogStore } from "@/lib/store/catalogStore";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { orderId } = await params;
  const order = CatalogStore.getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DFD4] text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#5B755A]/20 text-[#425941] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A]/15 text-[#425941] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#5B755A]" />
          Order Confirmed &bull; Plastic-Free Dispatch Arranged
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#1D2B1F]">
          Thank you for choosing conscious living!
        </h1>
        <p className="text-sm text-[#5C635E] max-w-lg mx-auto">
          We received your order <strong>{order.orderNumber}</strong>. A confirmation and tax invoice have been dispatched to <strong>{order.customer.email}</strong>.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-[#202421]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5B755A]" />
            <span>Est. Delivery: <strong>{order.estimatedDelivery}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#5B755A]" />
            <span>Tracking: <strong className="font-mono">{order.trackingNumber}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5B755A]" />
            <span>Payment: <strong>{order.payment.method} ({order.payment.status})</strong></span>
          </div>
        </div>
      </div>

      {/* Itemized Order Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5DFD4] pb-4">
          <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
            Order Items
          </h2>
          <span className="text-xs text-[#5C635E]">
            {order.items.reduce((s, i) => s + i.quantity, 0)} items total
          </span>
        </div>

        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E5DFD4]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1D2B1F]">{item.name}</h3>
                  {item.variantName && (
                    <p className="text-[#5C635E]">{item.variantName}</p>
                  )}
                  <p className="text-[11px] text-[#5C635E]">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right font-serif font-bold text-sm text-[#1D2B1F]">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="border-t border-[#E5DFD4] pt-4 space-y-2 text-xs text-[#5C635E]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-[#202421]">₹{order.subtotal.toLocaleString("en-IN")}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-[#425941]">
              <span>Discount {order.discountCode && `(${order.discountCode})`}</span>
              <span className="font-semibold">-₹{order.discountAmount.toLocaleString("en-IN")}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="font-medium text-[#202421]">
              {order.shippingFee === 0 ? <strong className="text-[#425941]">FREE</strong> : `₹${order.shippingFee}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-serif font-bold text-[#1D2B1F] pt-3 border-t border-[#E5DFD4]">
            <span>Total Paid (INR)</span>
            <span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address & Sustainable Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-2 text-xs">
          <h3 className="font-semibold text-sm text-[#1D2B1F] uppercase tracking-wider">
            Shipping Address
          </h3>
          <p className="font-semibold text-[#202421]">{order.shippingAddress.fullName}</p>
          <p className="text-[#5C635E]">{order.shippingAddress.street}</p>
          {order.shippingAddress.apartment && <p className="text-[#5C635E]">{order.shippingAddress.apartment}</p>}
          <p className="text-[#5C635E]">
            {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.postalCode}
          </p>
          <p className="text-[#5C635E]">{order.shippingAddress.country} &bull; {order.shippingAddress.phone}</p>
        </div>

        <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DFD4] space-y-3 text-xs">
          <div className="flex items-center gap-2 font-semibold text-[#425941]">
            <Package className="w-4 h-4 text-[#5B755A]" />
            <span>Zero Plastic Packaging Guarantee</span>
          </div>
          <p className="text-[#5C635E] leading-relaxed">
            Your items are cushioned using recyclable paper hexagons and packed in unbleached FSC boxes sealed with gummed kraft paper tape. Please recycle or compost the packaging!
          </p>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          href="/shop"
          className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-7 py-3 rounded-full text-xs font-semibold transition flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/account"
          className="border border-[#C8BEAF] hover:bg-[#FAF7F2] text-[#202421] px-6 py-3 rounded-full text-xs font-semibold transition"
        >
          View All Your Orders in Account
        </Link>
      </div>
    </div>
  );
}
