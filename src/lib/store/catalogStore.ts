import { Product, Bundle, CategoryInfo, DiscountCode, Order, UserProfile, LifestyleRecommendation, Address } from "@/types";
import { PRODUCTS, BUNDLES, CATEGORIES, DISCOUNT_CODES, DEMO_USER, DEMO_ORDERS } from "@/data/mockData";

const STORAGE_KEYS = {
  PRODUCTS: "earthly_products_v1",
  BUNDLES: "earthly_bundles_v1",
  ORDERS: "earthly_orders_v1",
  USER: "earthly_user_v1",
  FAVOURITES: "earthly_favourites_v1",
};

function safeGetStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSetStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage save error", e);
  }
}

export class CatalogStore {
  // Products
  static getProducts(): Product[] {
    return safeGetStorage<Product[]>(STORAGE_KEYS.PRODUCTS, PRODUCTS);
  }

  static getProductBySlug(slug: string): Product | undefined {
    const products = this.getProducts();
    return products.find((p) => p.slug === slug);
  }

  static getFeaturedProducts(): Product[] {
    return this.getProducts().filter((p) => p.isFeatured || p.isBestseller);
  }

  static getBestsellers(): Product[] {
    return this.getProducts().filter((p) => p.isBestseller);
  }

  static getRelatedProducts(category: string, currentId: string): Product[] {
    return this.getProducts()
      .filter((p) => p.category === category && p.id !== currentId)
      .slice(0, 4);
  }

  // Admin Product Management
  static saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === product.id);
    let updated: Product[];
    if (index >= 0) {
      updated = [...products];
      updated[index] = product;
    } else {
      updated = [product, ...products];
    }
    safeSetStorage(STORAGE_KEYS.PRODUCTS, updated);
  }

  static deleteProduct(id: string): void {
    const products = this.getProducts();
    const updated = products.filter((p) => p.id !== id);
    safeSetStorage(STORAGE_KEYS.PRODUCTS, updated);
  }

  static updateStock(productId: string, variantId: string | undefined, newStock: number): void {
    const products = this.getProducts();
    const updated = products.map((p) => {
      if (p.id !== productId) return p;
      if (variantId && p.variants.length > 0) {
        const variants = p.variants.map((v) => (v.id === variantId ? { ...v, stock: newStock } : v));
        const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
        return { ...p, variants, inventoryCount: totalStock, inStock: totalStock > 0 };
      }
      return { ...p, inventoryCount: newStock, inStock: newStock > 0 };
    });
    safeSetStorage(STORAGE_KEYS.PRODUCTS, updated);
  }

  // Categories
  static getCategories(): CategoryInfo[] {
    return CATEGORIES;
  }

  // Bundles
  static getBundles(): Bundle[] {
    return safeGetStorage<Bundle[]>(STORAGE_KEYS.BUNDLES, BUNDLES);
  }

  static getBundleBySlug(slug: string): Bundle | undefined {
    const bundles = this.getBundles();
    return bundles.find((b) => b.slug === slug);
  }

  // Discount Codes
  static validateDiscountCode(code: string, subtotal: number): { valid: boolean; discount: DiscountCode | null; error?: string } {
    const cleanCode = code.trim().toUpperCase();
    const match = DISCOUNT_CODES.find((d) => d.code === cleanCode);
    if (!match) {
      return { valid: false, discount: null, error: "Invalid promo code. Try EARTHLY10 or WELCOME20." };
    }
    if (match.minSpend && subtotal < match.minSpend) {
      return {
        valid: false,
        discount: null,
        error: `Requires a minimum purchase of ₹${match.minSpend.toLocaleString("en-IN")}.`,
      };
    }
    return { valid: true, discount: match };
  }

  // Lifestyle Discovery Engine
  static discoverRecommendations(
    selectedInterests: string[],
    primaryGoal?: string
  ): LifestyleRecommendation[] {
    const products = this.getProducts();
    const recommendations: LifestyleRecommendation[] = [];

    products.forEach((prod) => {
      let score = 0;
      let reasons: string[] = [];

      selectedInterests.forEach((interest) => {
        if (prod.lifestyleTags.includes(interest as any)) {
          score += 3;
          reasons.push(`Tailored for your mindful ${interest.toLowerCase()} lifestyle`);
        }
      });

      if (prod.category.toLowerCase().includes("kitchen") && selectedInterests.includes("Kitchen")) {
        score += 2;
        reasons.push("Replaces plastic food contact with tested non-toxic materials");
      }
      if (prod.category.toLowerCase().includes("travel") && selectedInterests.includes("Travel")) {
        score += 2;
        reasons.push("Compact and lightweight for airport security and daily commute");
      }
      if (prod.category.toLowerCase().includes("drinkware") && (selectedInterests.includes("Everyday Essentials") || selectedInterests.includes("Travel"))) {
        score += 2;
        reasons.push("Averts hundreds of disposable cups and PET bottles each year");
      }
      if (prod.category.toLowerCase().includes("stationery") && selectedInterests.includes("Work")) {
        score += 2;
        reasons.push("Plastic-free desk elegance crafted from renewable moso bamboo");
      }
      if (selectedInterests.includes("Gifting")) {
        score += 1;
        reasons.push("Ships in plastic-free aesthetic packaging ready for gifting");
      }

      if (score > 0) {
        recommendations.push({
          product: prod,
          matchScore: score,
          relevanceReason: reasons.slice(0, 2).join(". ") + ".",
        });
      }
    });

    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    return recommendations.slice(0, 6);
  }

  // Orders Management
  static getOrders(): Order[] {
    return safeGetStorage<Order[]>(STORAGE_KEYS.ORDERS, DEMO_ORDERS);
  }

  static getOrderById(orderId: string): Order | undefined {
    return this.getOrders().find((o) => o.id === orderId || o.orderNumber === orderId);
  }

  static createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "estimatedDelivery">): Order {
    const orders = this.getOrders();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `EARTH-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],
      trackingNumber: `ECO-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    const updated = [newOrder, ...orders];
    safeSetStorage(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  }

  static updateOrderStatus(orderId: string, status: Order["status"]): void {
    const orders = this.getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    safeSetStorage(STORAGE_KEYS.ORDERS, updated);
  }

  // User Profile
  static getUser(): UserProfile {
    return safeGetStorage<UserProfile>(STORAGE_KEYS.USER, DEMO_USER);
  }

  static updateUserProfile(profile: Partial<UserProfile>): void {
    const current = this.getUser();
    const updated = { ...current, ...profile };
    safeSetStorage(STORAGE_KEYS.USER, updated);
  }

  static addAddress(address: Address): void {
    const user = this.getUser();
    const addresses = [...user.addresses, address];
    this.updateUserProfile({ addresses });
  }

  static deleteAddress(addressId: string): void {
    const user = this.getUser();
    const addresses = user.addresses.filter((a) => a.id !== addressId);
    this.updateUserProfile({ addresses });
  }

  // Wishlist / Favourites
  static getFavourites(): string[] {
    return safeGetStorage<string[]>(STORAGE_KEYS.FAVOURITES, ["prod-1", "prod-3"]);
  }

  static toggleFavourite(productId: string): boolean {
    const favs = this.getFavourites();
    let updated: string[];
    let isNowFav: boolean;
    if (favs.includes(productId)) {
      updated = favs.filter((id) => id !== productId);
      isNowFav = false;
    } else {
      updated = [...favs, productId];
      isNowFav = true;
    }
    safeSetStorage(STORAGE_KEYS.FAVOURITES, updated);
    return isNowFav;
  }
}
