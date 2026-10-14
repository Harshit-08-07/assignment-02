"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Shield,
  Plus,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { CatalogStore } from "@/lib/store/catalogStore";
import { Order, Address, Product } from "@/types";

export function AccountClient() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as any) || "orders";

  const { user, logout, isAdmin, toggleRole, updateUser } = useAuth();
  const { favourites, toggleFavourite } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "profile">(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: user?.fullName || "Aarav Sharma",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: user?.phone || "+91 98765 43210",
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["orders", "wishlist", "addresses", "profile"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  useEffect(() => {
    setOrders(CatalogStore.getOrders());
    const all = CatalogStore.getProducts();
    setFavoriteProducts(all.filter((p) => favourites.includes(p.id)));
  }, [favourites]);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: addressForm.fullName,
      street: addressForm.street,
      city: addressForm.city,
      state: addressForm.state || "Karnataka",
      postalCode: addressForm.postalCode || "560001",
      country: "India",
      phone: addressForm.phone,
      isDefault: false,
    };

    CatalogStore.addAddress(newAddr);
    updateUser({ addresses: [...(user?.addresses || []), newAddr] });
    setNewAddressModal(false);
    setAddressForm({ fullName: user?.fullName || "", street: "", city: "", state: "", postalCode: "", phone: user?.phone || "" });
  };

  const handleDeleteAddress = (id: string) => {
    CatalogStore.deleteAddress(id);
    updateUser({ addresses: (user?.addresses || []).filter((a) => a.id !== id) });
  };

  const handleMoveToCart = (product: Product) => {
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
    toggleFavourite(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1D2B1F] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {user?.fullName?.charAt(0) || "A"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-[#1D2B1F]">
                {user?.fullName || "Conscious Customer"}
              </h1>
              <span className="text-[10px] bg-[#5B755A]/15 text-[#425941] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {user?.role || "Customer"}
              </span>
            </div>
            <p className="text-xs text-[#5C635E] mt-0.5">
              {user?.email} &bull; Member since 2026
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleRole}
            className="text-xs bg-[#FAF7F2] border border-[#C8BEAF] text-[#202421] px-3.5 py-2 rounded-xl font-medium hover:border-[#5B755A] transition flex items-center gap-1.5"
            title="Switch between Customer and Admin profile"
          >
            <Shield className="w-3.5 h-3.5 text-[#5B755A]" />
            <span>Switch Role to: <strong>{isAdmin ? "Customer" : "Admin"}</strong></span>
          </button>

          {isAdmin && (
            <Link
              href="/admin"
              className="text-xs bg-[#5B755A] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#425941] transition"
            >
              Open Admin Dashboard &rarr;
            </Link>
          )}

          <button
            onClick={logout}
            className="text-xs text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition flex items-center gap-1 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E5DFD4] p-3 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
              activeTab === "orders"
                ? "bg-[#1D2B1F] text-white"
                : "text-[#202421] hover:bg-[#FAF7F2]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4" /> Order History
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === "orders" ? "bg-white/20 text-white" : "bg-[#FAF7F2] text-[#5C635E]"}`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
              activeTab === "wishlist"
                ? "bg-[#1D2B1F] text-white"
                : "text-[#202421] hover:bg-[#FAF7F2]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Heart className="w-4 h-4" /> Saved Favourites
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === "wishlist" ? "bg-white/20 text-white" : "bg-[#FAF7F2] text-[#5C635E]"}`}>
              {favoriteProducts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
              activeTab === "addresses"
                ? "bg-[#1D2B1F] text-white"
                : "text-[#202421] hover:bg-[#FAF7F2]"
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
              activeTab === "profile"
                ? "bg-[#1D2B1F] text-white"
                : "text-[#202421] hover:bg-[#FAF7F2]"
            }`}
          >
            <User className="w-4 h-4" /> Profile Details
          </button>
        </aside>

        {/* Tab Content Panel */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm">
          {/* 1. ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFD4] pb-4">
                <h2 className="text-xl font-serif font-bold text-[#1D2B1F]">
                  Order History & Status
                </h2>
                <p className="text-xs text-[#5C635E] mt-0.5">
                  Track the journey of your low-impact deliveries across India.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-8 h-8 text-[#5C635E] mx-auto opacity-50" />
                  <p className="text-xs text-[#5C635E]">You have placed no orders yet.</p>
                  <Link
                    href="/shop"
                    className="inline-block bg-[#1D2B1F] text-white px-5 py-2 rounded-full text-xs font-semibold"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/50 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#E5DFD4] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#1D2B1F] font-mono text-sm">
                            {order.orderNumber}
                          </span>
                          <span className="text-[#5C635E]">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              order.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.status}
                          </span>

                          <Link
                            href={`/order-confirmation/${order.id}`}
                            className="text-[#5B755A] hover:underline font-semibold flex items-center gap-1"
                          >
                            Receipt <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-white shrink-0 border border-[#E5DFD4]">
                                <Image src={it.image} alt={it.name} fill className="object-cover" sizes="40px" />
                              </div>
                              <div>
                                <p className="font-semibold text-[#1D2B1F]">{it.name}</p>
                                <p className="text-[11px] text-[#5C635E]">Qty: {it.quantity}</p>
                              </div>
                            </div>
                            <span className="font-serif font-bold text-[#1D2B1F]">
                              ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#E5DFD4] flex items-center justify-between text-xs text-[#5C635E]">
                        <span>
                          Tracking: <strong className="font-mono text-[#202421]">{order.trackingNumber || "Pending"}</strong>
                        </span>
                        <span>
                          Total: <strong className="text-sm font-serif text-[#1D2B1F]">₹{order.total.toLocaleString("en-IN")}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFD4] pb-4">
                <h2 className="text-xl font-serif font-bold text-[#1D2B1F]">
                  Saved Favourites ({favoriteProducts.length})
                </h2>
                <p className="text-xs text-[#5C635E] mt-0.5">
                  Products you marked for your conscious home and commute.
                </p>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-8 h-8 text-[#5C635E] mx-auto opacity-50" />
                  <p className="text-xs text-[#5C635E]">No products saved to favourites yet.</p>
                  <Link
                    href="/shop"
                    className="inline-block bg-[#1D2B1F] text-white px-5 py-2 rounded-full text-xs font-semibold"
                  >
                    Explore Catalog
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/50 flex gap-4 items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white shrink-0 border border-[#E5DFD4]">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div>
                          <Link href={`/products/${p.slug}`} className="hover:text-[#5B755A]">
                            <h3 className="text-xs font-semibold text-[#1D2B1F] line-clamp-1">{p.name}</h3>
                          </Link>
                          <p className="text-xs font-serif font-bold text-[#1D2B1F] mt-0.5">
                            ₹{p.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handleMoveToCart(p)}
                          className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                        >
                          <ShoppingBag className="w-3 h-3" /> Move to Cart
                        </button>
                        <button
                          onClick={() => toggleFavourite(p.id)}
                          className="text-[11px] text-rose-600 hover:underline text-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. ADDRESSES TAB */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFD4] pb-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#1D2B1F]">
                    Saved Shipping Addresses
                  </h2>
                  <p className="text-xs text-[#5C635E] mt-0.5">
                    Manage destination addresses for fast 1-click checkout.
                  </p>
                </div>
                <button
                  onClick={() => setNewAddressModal(true)}
                  className="bg-[#5B755A] hover:bg-[#425941] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Address
                </button>
              </div>

              {/* Address List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(user?.addresses || []).map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/50 relative space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1D2B1F]">{addr.fullName}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#5B755A]/15 text-[#425941] px-2 py-0.5 rounded-full font-bold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[#5C635E] leading-relaxed">{addr.street}</p>
                    <p className="text-[#5C635E]">
                      {addr.city}, {addr.state} — {addr.postalCode}
                    </p>
                    <p className="text-[#5C635E]">Phone: {addr.phone}</p>
                    <div className="pt-2 border-t border-[#E5DFD4] flex justify-end">
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* New Address Modal */}
              {newAddressModal && (
                <form
                  onSubmit={handleAddAddress}
                  className="p-6 bg-white rounded-2xl border-2 border-[#5B755A] space-y-4 animate-in fade-in duration-150"
                >
                  <h3 className="text-sm font-semibold text-[#1D2B1F]">Add New Delivery Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="border border-[#E5DFD4] rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="border border-[#E5DFD4] rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="sm:col-span-2 border border-[#E5DFD4] rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="border border-[#E5DFD4] rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="border border-[#E5DFD4] rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="PIN Code"
                      value={addressForm.postalCode}
                      onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                      className="border border-[#E5DFD4] rounded-lg p-2"
                      required
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setNewAddressModal(false)}
                      className="px-4 py-1.5 rounded-lg border border-[#E5DFD4] text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#1D2B1F] text-white px-4 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 4. PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFD4] pb-4">
                <h2 className="text-xl font-serif font-bold text-[#1D2B1F]">
                  Profile Details
                </h2>
                <p className="text-xs text-[#5C635E] mt-0.5">
                  Update your contact details and preferences.
                </p>
              </div>

              <div className="space-y-4 max-w-md text-xs">
                <div>
                  <label className="text-xs font-semibold text-[#5C635E] block mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.fullName}
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5C635E] block mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-neutral-100 text-neutral-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5C635E] block mb-1">Phone Number</label>
                  <input
                    type="text"
                    defaultValue={user?.phone}
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  />
                </div>
                <div className="pt-2">
                  <span className="text-[11px] text-[#5B755A] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Conscious Living Member
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
