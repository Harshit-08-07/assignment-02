import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Sparkles, ArrowRight, Leaf, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story & Transparency Manifesto — EARTHLY",
  description:
    "Learn why EARTHLY was created to make conscious living effortless, and how we eliminate unverified eco-claims and single-use plastics.",
};

export default function StoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Editorial Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A]/15 text-[#425941] text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5 text-[#5B755A]" />
          Our Origin & Purpose
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1D2B1F] leading-tight">
          &ldquo;Makes conscious living easier to choose.&rdquo;
        </h1>
        <p className="text-base sm:text-lg text-[#5C635E] leading-relaxed">
          EARTHLY was born from a fundamental frustration: sustainable alternatives shouldn&apos;t feel like a compromise in performance, aesthetics, or honesty.
        </p>
      </div>

      {/* Visual Banner */}
      <div className="aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden relative shadow-lg border border-[#E5DFD4] bg-[#F5F2EB]">
        <Image
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=80"
          alt="Artisanal sustainable living workshop"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-3xl bg-white border border-[#E5DFD4] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
            Zero Greenwashing
          </h2>
          <p className="text-xs text-[#5C635E] leading-relaxed">
            We reject vague marketing terms like &ldquo;eco-friendly&rdquo; unless backed by certified chemical safety standards, specific alloys, and test numbers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E5DFD4] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
            Generational Longevity
          </h2>
          <p className="text-xs text-[#5C635E] leading-relaxed">
            Every bottle, tiffin, jar, and tote is built to withstand repeated drops and high friction. Replacing disposable consumption with heirloom durability.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E5DFD4] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#5B755A] text-white flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-serif font-bold text-[#1D2B1F]">
            Fair Indian Craft
          </h2>
          <p className="text-xs text-[#5C635E] leading-relaxed">
            We partner directly with historical craft clusters in Pune, Khurja, Moradabad, and Maheshwar, ensuring verified living wages and safe conditions.
          </p>
        </div>
      </div>

      {/* The Plastic-Free Promise */}
      <div className="bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#E5DFD4] space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#1D2B1F]">
          Our 100% Plastic-Free Dispatch Standard
        </h2>
        <p className="text-xs sm:text-sm text-[#5C635E] leading-relaxed">
          It makes no sense to buy a sustainable product wrapped in 5 layers of virgin plastic bubble wrap. From day one, every EARTHLY package has been dispatched using water-activated paper tape, unbleached FSC cardboard, and plant-derived cushioning.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#1D2B1F] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#2F4232] transition"
          >
            <span>Explore the Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
