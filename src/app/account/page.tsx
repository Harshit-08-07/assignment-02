import React, { Suspense } from "react";
import { Metadata } from "next";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "My Conscious Account — EARTHLY",
  description: "Manage your sustainable orders, saved favourites, and delivery addresses.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-[#5C635E]">Loading account details...</div>}>
      <AccountClient />
    </Suspense>
  );
}
