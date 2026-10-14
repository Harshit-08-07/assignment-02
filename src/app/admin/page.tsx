"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  Layers,
  MapPin,
  Award,
  BarChart3,
  ExternalLink,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CatalogStore } from "@/lib/store/catalogStore";
import { Product, Order, Bundle, ProductCategory } from "@/types";
import { productSchema, ProductFormData } from "@/lib/validations";

export default function AdminDashboardPage() {
  const { user, isAdmin, toggleRole } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "inventory" | "orders" | "bundles" | "makers"
  >("overview");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);

  // Search & Filter in Admin
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    tagline: "",
    description: "",
    category: "Reusable Drinkware" as ProductCategory,
    price: 999,
    compareAtPrice: 1299,
    inventoryCount: 30,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80",
    materials: "18/8 Food Grade Stainless Steel, FSC Bamboo",
    originRegion: "Pune, Maharashtra",
  });
  const [productFormError, setProductFormError] = useState<string | null>(null);

  const refreshData = () => {
    setProducts(CatalogStore.getProducts());
    setOrders(CatalogStore.getOrders());
    setBundles(CatalogStore.getBundles());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter((p) => p.inventoryCount <= 15);
  const totalPlasticAvoidedKg = products.reduce(
    (sum, p) => sum + (p.impactMetrics?.singleUsePlasticAvoidedKg || 0),
    0
  );

  // Handlers
  const handleOrderStatusChange = (orderId: string, newStatus: Order["status"]) => {
    CatalogStore.updateOrderStatus(orderId, newStatus);
    refreshData();
  };

  const handleStockAdjust = (productId: string, newStock: number) => {
    CatalogStore.updateStock(productId, undefined, Math.max(0, newStock));
    refreshData();
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to remove this product from the conscious catalog?")) {
      CatalogStore.deleteProduct(productId);
      refreshData();
    }
  };

  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      tagline: "",
      description: "",
      category: "Reusable Drinkware",
      price: 899,
      compareAtPrice: 1099,
      inventoryCount: 25,
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      materials: "100% Recycled Cotton / Stainless Steel",
      originRegion: "Jaipur, Rajasthan",
    });
    setProductFormError(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      price: p.price,
      compareAtPrice: p.compareAtPrice || p.price,
      inventoryCount: p.inventoryCount,
      imageUrl: p.images[0] || "",
      materials: p.transparency.composition,
      originRegion: p.transparency.origin.region,
    });
    setProductFormError(null);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const result = productSchema.safeParse(productForm);

    if (!result.success) {
      setProductFormError(result.error.issues[0]?.message || "Validation failed");
      return;
    }

    const slug = productForm.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newOrUpdated: Product = editingProduct
      ? {
          ...editingProduct,
          name: productForm.name,
          tagline: productForm.tagline,
          description: productForm.description,
          category: productForm.category,
          price: productForm.price,
          compareAtPrice: productForm.compareAtPrice,
          inventoryCount: productForm.inventoryCount,
          inStock: productForm.inventoryCount > 0,
          images: [productForm.imageUrl, ...(editingProduct.images.slice(1) || [])],
        }
      : {
          id: `prod-${Date.now()}`,
          slug,
          name: productForm.name,
          tagline: productForm.tagline,
          description: productForm.description,
          category: productForm.category,
          price: productForm.price,
          compareAtPrice: productForm.compareAtPrice,
          rating: 5.0,
          reviewCount: 1,
          images: [productForm.imageUrl],
          inStock: productForm.inventoryCount > 0,
          inventoryCount: productForm.inventoryCount,
          variants: [
            {
              id: `var-${Date.now()}`,
              name: "Standard",
              sku: `SKU-${Date.now().toString().slice(-4)}`,
              price: productForm.price,
              stock: productForm.inventoryCount,
            },
          ],
          transparency: {
            materials: [productForm.materials],
            composition: productForm.materials,
            durability: "Built for lifetime reuse and resilience.",
            careInstructions: ["Hand wash with mild eco-friendly soap."],
            packaging: {
              type: "100% Recycled Kraft Packaging",
              isRecyclable: true,
              plasticFree: true,
              details: "Zero single-use plastics.",
            },
            origin: {
              region: productForm.originRegion,
              country: "India",
              facilityType: "Verified Artisan Collective",
            },
            makerStory: {
              name: "Heritage Artisan Studio",
              artisanCommunity: "Fair wage certified craft cooperative",
              fairWageVerified: true,
              story: "Dedicated to reviving traditional sustainable Indian handicraft.",
            },
            certifications: [
              {
                name: "Plastic-Free Certified",
                isVerified: true,
                statusNote: "Verified plastic-free production flow",
              },
            ],
          },
          lifestyleTags: ["Everyday Essentials", "Home"],
          impactMetrics: {
            singleUsePlasticAvoidedKg: 25.0,
            lifespanYears: 8,
          },
        };

    CatalogStore.saveProduct(newOrUpdated);
    setIsProductModalOpen(false);
    refreshData();
  };

  // If user is not admin, show evaluation toggle gate
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#1D2B1F]">
          Protected Administrator Access
        </h1>
        <p className="text-sm text-[#5C635E] max-w-md mx-auto leading-relaxed">
          The admin dashboard is protected with role-based security. Click below to grant demo administrator credentials and inspect products, orders, inventory, and analytics.
        </p>
        <button
          onClick={toggleRole}
          className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-6 py-3 rounded-xl text-xs font-semibold shadow-md inline-flex items-center gap-2 transition"
        >
          <Shield className="w-4 h-4 text-[#849E83]" />
          <span>Enable Admin Session & Open Dashboard</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E5DFD4] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#5B755A] uppercase tracking-wider">
              EARTHLY Operations Portal
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1D2B1F] mt-1">
            Store Management Dashboard
          </h1>
          <p className="text-xs text-[#5C635E] mt-0.5">
            Manage sustainable inventory, fulfillment statuses, bundles, and verified transparency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshData}
            className="p-2.5 rounded-xl border border-[#E5DFD4] bg-white text-[#5C635E] hover:text-[#202421] transition"
            title="Refresh Store Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenNewProduct}
            className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sustainable Product</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#5C635E] uppercase tracking-wider">
              Total Revenue (INR)
            </div>
            <div className="text-2xl font-serif font-bold text-[#1D2B1F] mt-1">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-[#425941] font-medium mt-1">
              From {totalOrdersCount} verified orders
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#5B755A]/15 text-[#425941] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#5C635E] uppercase tracking-wider">
              Active Products
            </div>
            <div className="text-2xl font-serif font-bold text-[#1D2B1F] mt-1">
              {products.length} Items
            </div>
            <div className="text-[11px] text-[#5C635E] mt-1">
              Across 7 categories
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#1D2B1F] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#5C635E] uppercase tracking-wider">
              Low Stock Alerts
            </div>
            <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
              {lowStockProducts.length} Products
            </div>
            <div className="text-[11px] text-amber-800 font-medium mt-1">
              Stock threshold &le; 15 units
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#5C635E] uppercase tracking-wider">
              Plastic Avoided
            </div>
            <div className="text-2xl font-serif font-bold text-[#425941] mt-1">
              ~{Math.round(totalPlasticAvoidedKg)} kg
            </div>
            <div className="text-[11px] text-[#425941] font-medium mt-1">
              Catalog lifecycle impact
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#5B755A] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E5DFD4] gap-6 text-xs font-semibold uppercase tracking-wider overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "overview"
              ? "border-[#5B755A] text-[#1D2B1F]"
              : "border-transparent text-[#5C635E] hover:text-[#202421]"
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Analytics & Reports
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "products"
              ? "border-[#5B755A] text-[#1D2B1F]"
              : "border-transparent text-[#5C635E] hover:text-[#202421]"
          }`}
        >
          <Package className="w-4 h-4" /> Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`pb-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "inventory"
              ? "border-[#5B755A] text-[#1D2B1F]"
              : "border-transparent text-[#5C635E] hover:text-[#202421]"
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Inventory Management
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "orders"
              ? "border-[#5B755A] text-[#1D2B1F]"
              : "border-transparent text-[#5C635E] hover:text-[#202421]"
          }`}
        >
          <ShoppingCart className="w-4 h-4" /> Orders & Fulfillment ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("bundles")}
          className={`pb-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "bundles"
              ? "border-[#5B755A] text-[#1D2B1F]"
              : "border-transparent text-[#5C635E] hover:text-[#202421]"
          }`}
        >
          <Layers className="w-4 h-4" /> Bundles ({bundles.length})
        </button>
        <button
          onClick={() => setActiveTab("makers")}
          className={`pb-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "makers"
              ? "border-[#5B755A] text-[#1D2B1F]"
              : "border-transparent text-[#5C635E] hover:text-[#202421]"
          }`}
        >
          <MapPin className="w-4 h-4" /> Makers & Origins
        </button>
      </div>

      {/* 1. ANALYTICS & REPORTS TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales by Category Report */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-[#1D2B1F]">
                Product Inventory by Category
              </h3>
              <div className="space-y-3 pt-2 text-xs">
                {CatalogStore.getCategories().map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  const pct = Math.round((count / products.length) * 100) || 0;
                  return (
                    <div key={cat.id} className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-[#202421]">{cat.name}</span>
                        <span className="text-[#5C635E]">{count} items ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E5DFD4]">
                        <div
                          className="h-full bg-[#5B755A] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Environmental Impact Report */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-[#1D2B1F]">
                Sustainability & Plastic Avoidance Breakdown
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                Aggregated yearly environmental savings calculated across verified customers:
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4]">
                  <div className="text-2xl font-serif font-bold text-[#1D2B1F]">
                    {orders.length * 28}
                  </div>
                  <div className="text-xs text-[#5C635E] mt-1">Single-use cups averted</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4]">
                  <div className="text-2xl font-serif font-bold text-[#1D2B1F]">
                    {orders.length * 45}
                  </div>
                  <div className="text-xs text-[#5C635E] mt-1">PET plastic bottles replaced</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4]">
                  <div className="text-2xl font-serif font-bold text-[#1D2B1F]">
                    100%
                  </div>
                  <div className="text-xs text-[#5C635E] mt-1">Plastic-free dispatched packages</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4]">
                  <div className="text-2xl font-serif font-bold text-[#1D2B1F]">
                    85+
                  </div>
                  <div className="text-xs text-[#5C635E] mt-1">Indian artisans supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT TAB */}
      {activeTab === "products" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search catalog products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
              />
              <Search className="w-3.5 h-3.5 text-[#5C635E] absolute left-3 top-2.5" />
            </div>

            <div className="text-xs text-[#5C635E]">
              Showing {products.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase())).length} of {products.length} products
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#5C635E] uppercase tracking-wider text-[10px] border-b border-[#E5DFD4]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD4]">
                {products
                  .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                  .map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF7F2]/50">
                      <td className="p-3 flex items-center gap-3">
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E5DFD4]">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1D2B1F]">{product.name}</div>
                          <div className="text-[10px] text-[#5C635E]">{product.slug}</div>
                        </div>
                      </td>
                      <td className="p-3 text-[#5C635E] font-medium">{product.category}</td>
                      <td className="p-3 font-serif font-bold text-[#1D2B1F]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 font-bold text-[#202421]">
                        {product.inventoryCount} units
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            product.inStock
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-neutral-200 text-neutral-600"
                          }`}
                        >
                          {product.inStock ? "Active" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(product)}
                          className="p-1.5 rounded-lg text-[#5B755A] hover:bg-[#FAF7F2] transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. INVENTORY MANAGEMENT TAB */}
      {activeTab === "inventory" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-[#E5DFD4] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
              Real-Time Inventory Levels
            </h2>
            <p className="text-xs text-[#5C635E] mt-0.5">
              Adjust stock counts, inspect low-stock warnings, and restock units in 1 click.
            </p>
          </div>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-white shrink-0 border border-[#E5DFD4]">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1D2B1F]">{p.name}</h3>
                    <p className="text-[11px] text-[#5C635E]">{p.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        p.inventoryCount <= 15
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {p.inventoryCount} in stock
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStockAdjust(p.id, p.inventoryCount - 5)}
                      className="px-2.5 py-1 bg-white border border-[#E5DFD4] hover:bg-[#FAF7F2] rounded-lg font-bold"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => handleStockAdjust(p.id, p.inventoryCount + 10)}
                      className="px-2.5 py-1 bg-[#1D2B1F] text-white hover:bg-[#2F4232] rounded-lg font-bold"
                    >
                      +10 Restock
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ORDERS & FULFILLMENT TAB */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD4] pb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
                Customer Orders & Fulfillment
              </h2>
              <p className="text-xs text-[#5C635E] mt-0.5">
                Update status, inspect delivery addresses, and track plastic-free dispatches.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search order number or customer..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
              />
              <Search className="w-3.5 h-3.5 text-[#5C635E] absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-4">
            {orders
              .filter(
                (o) =>
                  o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase())
              )
              .map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/40 space-y-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DFD4] pb-3">
                    <div>
                      <span className="font-bold font-mono text-sm text-[#1D2B1F]">
                        {order.orderNumber}
                      </span>
                      <span className="text-[#5C635E] ml-3">
                        Customer: <strong>{order.customer.fullName}</strong> ({order.customer.phone})
                      </span>
                    </div>

                    {/* Status updater */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#5C635E]">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleOrderStatusChange(order.id, e.target.value as Order["status"])
                        }
                        className="bg-white border border-[#C8BEAF] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#1D2B1F] focus:outline-none focus:ring-1 focus:ring-[#5B755A] cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#5C635E]">
                    <div>
                      Destination: {order.shippingAddress.city}, {order.shippingAddress.state} &bull; Payment:{" "}
                      <strong>{order.payment.method} ({order.payment.status})</strong>
                    </div>
                    <div>
                      Tracking: <strong className="font-mono text-[#202421]">{order.trackingNumber || "Pending"}</strong> &bull; Total:{" "}
                      <strong className="text-sm font-serif text-[#1D2B1F]">₹{order.total.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 5. BUNDLES TAB */}
      {activeTab === "bundles" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-[#E5DFD4] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
              Curated Starter Bundles ({bundles.length})
            </h2>
            <p className="text-xs text-[#5C635E] mt-0.5">
              Review bundle configurations, discounts, and included products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/50 space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-[#1D2B1F]">{b.name}</h3>
                    <p className="text-[11px] text-[#5C635E]">{b.tagline}</p>
                  </div>
                  <span className="bg-[#5B755A]/15 text-[#425941] px-2.5 py-0.5 rounded-full font-bold">
                    Save {b.discountPercentage}%
                  </span>
                </div>
                <div className="space-y-1 py-1">
                  {b.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[#5C635E]">
                      <span>{it.quantity}x {it.productName}</span>
                      <span>₹{it.individualPrice}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#E5DFD4] flex justify-between font-bold">
                  <span>Bundle Price: ₹{b.bundlePrice.toLocaleString("en-IN")}</span>
                  <span className="text-[#5C635E] line-through font-normal">₹{b.regularPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MAKERS & ORIGINS TAB */}
      {activeTab === "makers" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E5DFD4] shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-[#E5DFD4] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
              Artisan Guilds & Material Transparency Origins
            </h2>
            <p className="text-xs text-[#5C635E] mt-0.5">
              Verified maker cooperatives with fair living wages and lab safety records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.slice(0, 6).map((p) => (
              <div key={p.id} className="p-5 rounded-2xl border border-[#E5DFD4] bg-[#FAF7F2]/50 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-[#1D2B1F]">
                  <span>{p.transparency.makerStory.name}</span>
                  <span className="text-[#425941] font-semibold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5B755A]" /> Fair Wage Verified
                  </span>
                </div>
                <div className="text-[11px] text-[#5B755A] font-semibold">
                  Origin: {p.transparency.origin.region}, {p.transparency.origin.country}
                </div>
                <p className="text-[#5C635E] leading-relaxed">
                  {p.transparency.makerStory.story}
                </p>
                <div className="pt-1 text-[11px] text-[#202421]">
                  Associated Product: <strong>{p.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1D2B1F]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E5DFD4] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E5DFD4] pb-3">
              <h3 className="text-lg font-serif font-bold text-[#1D2B1F]">
                {editingProduct ? "Edit Sustainable Product" : "Add New Sustainable Product"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-[#5C635E] hover:text-[#202421]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {productFormError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                  {productFormError}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Short Tagline *</label>
                <input
                  type="text"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#202421]">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value as ProductCategory })
                    }
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  >
                    {CatalogStore.getCategories().map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#202421]">Price in INR (₹) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#202421]">Initial Stock (Units) *</label>
                  <input
                    type="number"
                    value={productForm.inventoryCount}
                    onChange={(e) =>
                      setProductForm({ ...productForm, inventoryCount: Number(e.target.value) })
                    }
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#202421]">Origin Region *</label>
                  <input
                    type="text"
                    value={productForm.originRegion}
                    onChange={(e) =>
                      setProductForm({ ...productForm, originRegion: e.target.value })
                    }
                    className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Image URL (Unsplash / Hosted) *</label>
                <input
                  type="url"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Materials & Composition *</label>
                <input
                  type="text"
                  value={productForm.materials}
                  onChange={(e) => setProductForm({ ...productForm, materials: e.target.value })}
                  className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Full Description *</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full border border-[#E5DFD4] rounded-xl p-2.5 bg-[#FAF7F2]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#E5DFD4] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5DFD4] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-5 py-2 rounded-xl font-semibold shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
