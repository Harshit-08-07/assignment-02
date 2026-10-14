"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { CatalogStore } from "@/lib/store/catalogStore";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCategory } from "@/types";

export function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "featured";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const categories = useMemo(() => ["All", ...CatalogStore.getCategories().map((c) => c.name)], []);
  const allProducts = useMemo(() => CatalogStore.getProducts(), []);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
    const s = searchParams.get("sort");
    if (s) setSortBy(s);
  }, [searchParams]);

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesMaterials = product.transparency.materials.some((m) =>
          m.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesTagline && !matchesCategory && !matchesMaterials) {
          return false;
        }
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "bestselling") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0; // featured/default
    });
  }, [allProducts, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
    setInStockOnly(false);
    setMaxPrice(2500);
    router.push("/shop");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    inStockOnly ||
    maxPrice < 2500 ||
    sortBy !== "featured";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DFD4] pb-6 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#5B755A]">
            Plastic-Free Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F] mt-1">
            Conscious Lifestyle Collection
          </h1>
          <p className="text-sm text-[#5C635E] mt-1">
            Verified everyday reusables crafted for durability, non-toxicity, and minimal planetary impact.
          </p>
        </div>

        {/* Quick Discovery CTA */}
        <button
          onClick={() => router.push("/discover")}
          className="inline-flex items-center gap-2 bg-[#5B755A]/15 text-[#425941] hover:bg-[#5B755A]/25 px-4 py-2 rounded-full text-xs font-semibold transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#5B755A]" />
          Take Lifestyle Matching Quiz
        </button>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD4]">
            <h2 className="text-sm font-semibold text-[#1D2B1F] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#5B755A]" />
              Filter Catalog
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Categories List */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#5C635E]">
              Category
            </label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-[#1D2B1F] text-white"
                      : "text-[#202421] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <span>{cat}</span>
                  {cat !== "All" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        selectedCategory === cat
                          ? "bg-white/20 text-white"
                          : "text-[#5C635E] bg-[#FAF7F2]"
                      }`}
                    >
                      {allProducts.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-[#E5DFD4]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold uppercase tracking-wider text-[#5C635E]">
                Max Price
              </label>
              <span className="font-bold text-[#1D2B1F]">
                ₹{maxPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="2500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#5B755A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5C635E]">
              <span>₹400</span>
              <span>₹2,500</span>
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2 border-t border-[#E5DFD4]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#202421]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#5B755A] focus:ring-[#5B755A] border-[#C8BEAF]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Products Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar: Search, Sort & Mobile Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border border-[#E5DFD4] shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials..."
                className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2 pl-9 pr-8 text-xs text-[#202421] placeholder-[#5C635E] focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
              />
              <Search className="w-3.5 h-3.5 text-[#5C635E] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-[#5C635E] hover:text-[#202421]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E5DFD4] px-3 py-2 rounded-xl text-xs font-semibold text-[#202421]"
              >
                <Filter className="w-3.5 h-3.5 text-[#5B755A]" />
                <span>Filters {hasActiveFilters && "•"}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5C635E] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2 px-3 text-xs font-medium text-[#202421] focus:outline-none focus:ring-1 focus:ring-[#5B755A] cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="bestselling">Bestselling First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#5C635E]">Active:</span>
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E5DFD4] px-2.5 py-1 rounded-full text-[#1D2B1F]">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E5DFD4] px-2.5 py-1 rounded-full text-[#1D2B1F]">
                  Keyword: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E5DFD4] px-2.5 py-1 rounded-full text-[#1D2B1F]">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice < 2500 && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E5DFD4] px-2.5 py-1 rounded-full text-[#1D2B1F]">
                  Under ₹{maxPrice}
                  <button onClick={() => setMaxPrice(2500)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#5B755A] hover:underline font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-xs text-[#5C635E]">
            Showing <strong>{filteredProducts.length}</strong> sustainable products
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E5DFD4] p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#5C635E] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1D2B1F]">
                No matching sustainable products found
              </h3>
              <p className="text-xs text-[#5C635E] max-w-sm mx-auto">
                Try loosening your filters, adjusting the price ceiling, or searching for broader terms like &quot;stainless&quot; or &quot;bottle&quot;.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#1D2B1F] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#2F4232] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-Over Dialog */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-[#1D2B1F]/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5DFD4] pb-4">
                  <h3 className="font-semibold text-base text-[#1D2B1F]">Filters</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-full text-[#5C635E]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#5C635E]">
                    Category
                  </label>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                          selectedCategory === cat
                            ? "bg-[#1D2B1F] text-white"
                            : "text-[#202421] hover:bg-[#FAF7F2]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#5C635E]">Max Price</span>
                    <span className="font-bold">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="2500"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#5B755A]"
                  />
                </div>

                {/* Stock */}
                <label className="flex items-center gap-2 text-xs font-medium text-[#202421]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#5B755A]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              <div className="pt-6 border-t border-[#E5DFD4] space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-[#1D2B1F] text-white py-3 rounded-xl text-xs font-semibold"
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="w-full bg-[#FAF7F2] text-[#202421] py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Reset All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
