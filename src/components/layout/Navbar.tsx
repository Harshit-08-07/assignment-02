"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Shield,
  Leaf,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/data/mockData";

export function Navbar() {
  const router = useRouter();
  const { itemCount, toggleCart } = useCart();
  const { favouriteCount } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DFD4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#202421] hover:text-[#5B755A] transition"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Tagline */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-full bg-[#1D2B1F] flex items-center justify-center text-[#FAF7F2] shadow-sm group-hover:bg-[#5B755A] transition-colors">
                <Leaf className="w-4 h-4 text-[#849E83] group-hover:text-white transition-colors" />
              </span>
              <span className="text-2xl font-serif font-bold tracking-tight text-[#1D2B1F]">
                EARTHLY
              </span>
            </Link>
            <span className="hidden sm:inline-block text-[11px] font-medium text-[#5C635E] tracking-tight -mt-0.5">
              Makes conscious living easier to choose.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#202421]">
            <Link
              href="/shop"
              className="hover:text-[#5B755A] py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#5B755A] hover:after:w-full after:transition-all"
            >
              Shop All
            </Link>

            {/* Categories Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#5B755A] py-2 transition-colors"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-[#E5DFD4] p-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="text-[11px] font-semibold text-[#5C635E] uppercase tracking-wider px-3 py-1.5 border-b border-neutral-100">
                    Sustainable Categories
                  </div>
                  <div className="py-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#202421] hover:bg-[#FAF7F2] hover:text-[#5B755A] transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-[#5C635E] bg-[#FAF7F2] px-2 py-0.5 rounded-full">
                          {cat.itemCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/bundles"
              className="hover:text-[#5B755A] py-2 transition-colors flex items-center gap-1 relative"
            >
              Bundles
              <span className="px-1.5 py-0.2 bg-[#5B755A]/15 text-[#425941] text-[10px] font-semibold rounded-full">
                Save 17%
              </span>
            </Link>

            <Link
              href="/discover"
              className="hover:text-[#5B755A] py-2 transition-colors flex items-center gap-1.5 text-[#425941]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5B755A]" />
              Lifestyle Discovery
            </Link>

            <Link
              href="/story"
              className="hover:text-[#5B755A] py-2 transition-colors"
            >
              Our Story
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#202421] hover:text-[#5B755A] hover:bg-[#EFE9DE]/50 rounded-full transition"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account?tab=wishlist"
              className="p-2 text-[#202421] hover:text-[#5B755A] hover:bg-[#EFE9DE]/50 rounded-full transition relative"
              aria-label="View Favourites"
              title="Saved Favourites"
            >
              <Heart className="w-5 h-5" />
              {favouriteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#849E83] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favouriteCount}
                </span>
              )}
            </Link>

            {/* Account / Admin Link */}
            <Link
              href={isAdmin ? "/admin" : "/account"}
              className="p-2 text-[#202421] hover:text-[#5B755A] hover:bg-[#EFE9DE]/50 rounded-full transition relative"
              aria-label={isAdmin ? "Admin Dashboard" : "Customer Account"}
              title={isAdmin ? "Admin Dashboard" : "Customer Account"}
            >
              {isAdmin ? (
                <Shield className="w-5 h-5 text-[#5B755A]" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              className="flex items-center gap-2 bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-3.5 py-2 rounded-full transition shadow-sm text-sm font-medium"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="w-5 h-5 rounded-full bg-[#5B755A] text-[11px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="py-3 px-2 border-t border-[#E5DFD4] animate-in fade-in duration-150">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stainless bottles, ceramic cups, storage jars, tote bags..."
                className="w-full bg-white border border-[#C8BEAF] rounded-full py-2.5 pl-11 pr-24 text-sm text-[#202421] placeholder-[#5C635E] focus:outline-none focus:ring-2 focus:ring-[#5B755A] focus:border-transparent shadow-sm"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#5C635E] absolute left-4 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-[#5B755A] hover:bg-[#425941] text-white px-4 py-1.5 rounded-full text-xs font-semibold transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DFD4] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white border border-[#E5DFD4] rounded-lg py-2 pl-9 pr-4 text-sm"
            />
            <Search className="w-4 h-4 text-[#5C635E] absolute left-3 top-2.5" />
          </form>

          <div className="space-y-1">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#202421] hover:bg-[#EFE9DE]"
            >
              Shop All Products
            </Link>
            <Link
              href="/bundles"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#202421] hover:bg-[#EFE9DE]"
            >
              Curated Bundles (Save 17%)
            </Link>
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#5B755A] hover:bg-[#EFE9DE] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Lifestyle Discovery
            </Link>
            <Link
              href="/story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#202421] hover:bg-[#EFE9DE]"
            >
              Our Story & Manifesto
            </Link>
          </div>

          <div className="border-t border-[#E5DFD4] pt-3">
            <div className="text-xs font-semibold text-[#5C635E] uppercase tracking-wider px-3 mb-2">
              Categories
            </div>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#202421] hover:text-[#5B755A]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E5DFD4] pt-3 flex flex-col gap-2">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#202421] hover:bg-[#EFE9DE]"
            >
              <User className="w-4 h-4" /> My Account
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#5B755A] hover:bg-[#EFE9DE]"
            >
              <Shield className="w-4 h-4" /> Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
