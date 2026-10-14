"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Package, ShieldCheck, RotateCcw, Leaf } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Materials" | "Shipping" | "Packaging" | "Returns";
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Materials",
    question: "What makes your stainless steel food contact safe?",
    answer:
      "All EARTHLY bottles, containers, and cutlery are constructed from verified 18/8 (SS 304) or surgical-grade 316 stainless steel. We test every production batch with NABL-accredited metallurgical laboratories to verify nickel stability and zero leaching of lead, cadmium, or phthalates.",
  },
  {
    category: "Materials",
    question: "Are your certifications verified or self-declared?",
    answer:
      "We strictly display only verified certifications. Every certification listed on our product pages includes an auditor name, certificate number, or laboratory report identifier (e.g. FSC-C149202, Control Union GOTS-IN-2025). We never use unverified self-made eco labels.",
  },
  {
    category: "Packaging",
    question: "Is your packaging genuinely 100% plastic-free?",
    answer:
      "Yes. We strictly prohibit single-use plastic bubble wraps, plastic strapping tape, and poly mailers. Orders are shipped in unbleached FSC-certified corrugated boxes cushioned by recycled paper honeycomb mesh, sealed with water-activated starch paper tape.",
  },
  {
    category: "Shipping",
    question: "How does carbon-neutral delivery work?",
    answer:
      "We measure freight distances and offset carbon generated through certified Indian reforestation and solar rural electrification programs. Delivery is free nationwide on conscious orders over ₹999.",
  },
  {
    category: "Returns",
    question: "What is your return policy for conscious items?",
    answer:
      "We offer a 14-day return window on unused products in their original plastic-free packaging. If an item arrives damaged or defective, we provide an immediate free replacement.",
  },
  {
    category: "Materials",
    question: "How do I care for my acacia wood and bamboo products?",
    answer:
      "Bamboo and acacia wood items should be hand-washed with mild soap and dried immediately. Avoid soaking in water or placing them in dishwashers. To preserve luster, occasionally rub a small drop of food-safe coconut or olive oil into the wood.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ["All", "Materials", "Packaging", "Shipping", "Returns"];

  const filteredFaqs =
    activeCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B755A]/15 text-[#425941] text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-[#5B755A]" />
          Transparency & Assistance
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#5C635E] max-w-lg mx-auto">
          Clear answers about our tested materials, packaging standards, carbon offsets, and artisan commitments.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeCategory === cat
                ? "bg-[#1D2B1F] text-white"
                : "bg-white border border-[#E5DFD4] text-[#5C635E] hover:text-[#1D2B1F]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E5DFD4] overflow-hidden transition shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#1D2B1F]"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#5B755A] shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-[#5C635E] leading-relaxed border-t border-[#FAF7F2] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
