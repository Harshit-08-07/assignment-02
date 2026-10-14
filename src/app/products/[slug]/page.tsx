import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CatalogStore } from "@/lib/store/catalogStore";
import { ProductDetailClient } from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = CatalogStore.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — EARTHLY",
    };
  }

  return {
    title: `${product.name} — EARTHLY Sustainable Store`,
    description: `${product.tagline} Made with ${product.transparency.composition}. Verified sustainable living.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = CatalogStore.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = CatalogStore.getRelatedProducts(product.category, product.id);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
