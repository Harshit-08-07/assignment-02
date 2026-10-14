import React, { Suspense } from "react";
import { Metadata } from "next";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop All Sustainable Essentials — EARTHLY",
  description:
    "Explore our complete range of certified sustainable drinkware, kitchen tools, everyday bags, and conscious home essentials.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#5C635E]">
          Loading sustainable collection...
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
