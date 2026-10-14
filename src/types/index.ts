export type ProductCategory =
  | "Home Essentials"
  | "Travel Accessories"
  | "Kitchen Products"
  | "Work and Stationery"
  | "Reusable Drinkware"
  | "Gift Bundles"
  | "Everyday Essentials";

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  description: string;
  imageUrl: string;
  itemCount: number;
}

export interface TransparencyDetails {
  materials: string[];
  composition: string;
  durability: string;
  careInstructions: string[];
  packaging: {
    type: string;
    isRecyclable: boolean;
    plasticFree: boolean;
    details: string;
  };
  origin: {
    region: string;
    country: string;
    facilityType: string;
  };
  makerStory: {
    name: string;
    artisanCommunity: string;
    fairWageVerified: boolean;
    story: string;
  };
  certifications: {
    name: string;
    isVerified: boolean;
    statusNote: string;
    verificationAgency?: string;
  }[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "500ml / Sage Green", "Natural Sand / Large"
  sku: string;
  price: number;
  stock: number;
  colorHex?: string;
  sizeLabel?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isBestseller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  inventoryCount: number;
  variants: ProductVariant[];
  transparency: TransparencyDetails;
  lifestyleTags: ("Home" | "Travel" | "Kitchen" | "Work" | "Everyday Essentials" | "Gifting")[];
  impactMetrics: {
    singleUsePlasticAvoidedKg: number;
    lifespanYears: number;
  };
}

export interface BundleItem {
  productId: string;
  productName: string;
  quantity: number;
  individualPrice: number;
  image: string;
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  items: BundleItem[];
  regularPrice: number;
  bundlePrice: number;
  discountPercentage: number;
  isBestseller?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique item cart key (productId + variantId)
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
  isBundle?: boolean;
  bundleId?: string;
}

export interface DiscountCode {
  code: string;
  type: "percentage" | "fixed";
  value: number; // percentage (e.g. 15 for 15%) or fixed amount (e.g. 200 for ₹200)
  minSpend?: number;
  description: string;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    email: string;
    fullName: string;
    phone: string;
  };
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  shippingFee: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  payment: {
    method: "UPI" | "Card" | "NetBanking" | "COD";
    status: "Completed" | "Pending" | "DemoVerified";
    transactionRef: string;
  };
  trackingNumber?: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: "customer" | "admin";
  addresses: Address[];
  createdAt: string;
}

export interface LifestyleRecommendation {
  product: Product;
  matchScore: number;
  relevanceReason: string;
}
