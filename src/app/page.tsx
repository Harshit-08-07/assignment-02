import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  PackageCheck,
  Recycle,
  HeartHandshake,
  Layers,
  Award,
} from "lucide-react";
import { CatalogStore } from "@/lib/store/catalogStore";
import { ProductCard } from "@/components/products/ProductCard";
import { BundleCard } from "@/components/bundles/BundleCard";

export default function HomePage() {
  const categories = CatalogStore.getCategories();
  const bestsellers = CatalogStore.getBestsellers();
  const recommended = CatalogStore.getProducts().slice(4, 8);
  const bundles = CatalogStore.getBundles();

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-24 bg-gradient-to-b from-[#F5F2EB] to-[#FAF7F2] border-b border-[#E5DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5B755A]/15 border border-[#5B755A]/30 text-[#425941] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#5B755A]" />
                <span>Makes conscious living easier to choose.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1D2B1F] tracking-tight leading-[1.15]">
                Make room for better everyday choices.
              </h1>

              <p className="text-base sm:text-lg text-[#5C635E] max-w-2xl leading-relaxed">
                EARTHLY crafts durable, beautifully simple alternatives for your kitchen, desk, commute, and home. Zero greenwashing. Full material transparency. Built to last generations.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition shadow-md flex items-center gap-2 group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/story"
                  className="bg-white hover:bg-[#FAF7F2] text-[#202421] border border-[#C8BEAF] px-6 py-3.5 rounded-full text-sm font-semibold transition shadow-xs"
                >
                  Explore Our Story
                </Link>

                <Link
                  href="/discover"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B755A] hover:text-[#425941] py-2 px-3 rounded-lg hover:bg-[#EFE9DE]/50 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Take Lifestyle Quiz &rarr;
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E5DFD4] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-[#202421]">
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#5B755A] shrink-0" />
                  <span>100% Plastic-Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5B755A] shrink-0" />
                  <span>Lab-Verified Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#5B755A] shrink-0" />
                  <span>Fair Living Wages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-[#5B755A] shrink-0" />
                  <span>Carbon-Neutral</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Mosaic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative bg-[#EFE9DE]">
                  <Image
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80"
                    alt="Sustainable reusable drinkware and home essentials by EARTHLY"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                      PureSteel Flask &bull; ₹999
                    </div>
                    <div className="text-sm font-medium mt-0.5">
                      Eliminates ~36.5 kg of disposable single-use plastic per year.
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E5DFD4] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center font-bold">
                    100%
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-[#1D2B1F]">Verified Transparency</p>
                    <p className="text-[#5C635E]">Direct artisan cooperatives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#5B755A] uppercase tracking-wider">
              Conscious Collections
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1D2B1F] mt-1">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-[#5C635E] max-w-md mt-2 md:mt-0">
            Thoughtfully curated daily tools organized by where you spend your life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="earthly-card group p-3.5 flex flex-col items-center text-center hover:border-[#5B755A] transition-all bg-white"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative mb-3 bg-[#FAF7F2] border border-[#E5DFD4]">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#1D2B1F] group-hover:text-[#5B755A] transition line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#5C635E] mt-0.5">
                {cat.itemCount} items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#5B755A] uppercase tracking-wider">
              Customer Favorites
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1D2B1F] mt-1">
              Bestselling Essentials
            </h2>
          </div>
          <Link
            href="/shop?sort=bestselling"
            className="text-xs sm:text-sm font-semibold text-[#1D2B1F] hover:text-[#5B755A] flex items-center gap-1"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. CURATED BUNDLES SHOWCASE */}
      <section className="bg-[#EFE9DE]/50 py-16 border-y border-[#E5DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5B755A]/20 text-[#425941] text-xs font-semibold mb-2">
                <Layers className="w-3.5 h-3.5" />
                Bundle & Save up to 17%
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F]">
                Curated Starter Sets
              </h2>
            </div>
            <Link
              href="/bundles"
              className="text-sm font-semibold text-[#1D2B1F] hover:text-[#5B755A] flex items-center gap-1 mt-3 md:mt-0"
            >
              <span>Explore All Bundles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECOMMENDED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#5B755A] uppercase tracking-wider">
              Handpicked for Conscious Living
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1D2B1F] mt-1">
              Recommended for You
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-[#1D2B1F] hover:text-[#5B755A] flex items-center gap-1"
          >
            <span>See Full Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. TRANSPARENCY SECTION - NO FAKE CLAIMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DFD4] shadow-sm">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-[#5B755A] uppercase tracking-wider">
              Our Transparency Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F] mt-2 mb-4">
              We never invent green credentials.
            </h2>
            <p className="text-[#5C635E] text-base leading-relaxed">
              In a market full of vague eco-jargon and self-certified green badges, EARTHLY stands for verified facts. Every product page documents the exact alloy of steel, origin of wood, and testing lab report numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1D2B1F]">
                Tested Materials
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                Food-contact SS 304 and SS 316 steel tested for zero nickel/lead leaching. High borosilicate glass rated for 150°C thermal shocks. Zero PVC or BPA plastics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1D2B1F]">
                100% Plastic-Free Dispatch
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                We pack orders in FSC unbleached corrugated boxes sealed with water-activated starch tape. Cushioned with honeycomb paper, not bubble wrap.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1D2B1F]">
                Ethical Indian Artisans
              </h3>
              <p className="text-xs text-[#5C635E] leading-relaxed">
                Our ceramicists in Khurja, handloom weavers in Maheshwar, and metal turners in Moradabad earn living wages with verifiable safety protections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LIFESTYLE DISCOVERY INTERACTIVE CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1D2B1F] text-white p-8 sm:p-14 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A] text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Preference-Based Discovery
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Not sure where to begin? Take our 60-second lifestyle discovery.
            </h2>

            <p className="text-[#FAF7F2]/80 text-sm sm:text-base leading-relaxed">
              Whether you are upgrading your daily work desk, outfitting a plastic-free kitchen, or packing for travel, our engine recommends the exact tools that match your routine — complete with transparent rationale.
            </p>

            <div>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-white text-[#1D2B1F] px-7 py-3.5 rounded-full font-semibold text-sm transition shadow-md"
              >
                <span>Find My Sustainable Matches</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative Leaf Background Glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#5B755A]/20 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
