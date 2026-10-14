import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EARTHLY — Sustainable Living Made Effortless",
  description:
    "Makes conscious living easier to choose. Explore verified sustainable home essentials, reusable drinkware, kitchen products, and gift bundles crafted with transparency.",
  keywords: [
    "sustainable lifestyle",
    "eco-friendly store",
    "reusable drinkware",
    "plastic-free home",
    "zero waste kitchen",
    "conscious living",
    "earthly",
  ],
  openGraph: {
    title: "EARTHLY — Sustainable Living Made Effortless",
    description: "Makes conscious living easier to choose.",
    siteName: "EARTHLY",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#202421] font-sans antialiased selection:bg-[#5B755A] selection:text-white">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
