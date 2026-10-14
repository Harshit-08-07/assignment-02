import { describe, it, expect } from "vitest";
import { CatalogStore } from "../lib/store/catalogStore";

describe("EARTHLY Catalog Store & Business Logic", () => {
  it("should have at least 12 realistic sustainable products", () => {
    const products = CatalogStore.getProducts();
    expect(products.length).toBeGreaterThanOrEqual(12);
  });

  it("should cover all 7 requested sustainable categories", () => {
    const categories = CatalogStore.getCategories();
    expect(categories.length).toBe(7);
    const categoryNames = categories.map((c) => c.name);
    expect(categoryNames).toContain("Home Essentials");
    expect(categoryNames).toContain("Travel Accessories");
    expect(categoryNames).toContain("Kitchen Products");
    expect(categoryNames).toContain("Work and Stationery");
    expect(categoryNames).toContain("Reusable Drinkware");
    expect(categoryNames).toContain("Gift Bundles");
    expect(categoryNames).toContain("Everyday Essentials");
  });

  it("should have all 4 curated starter bundles with discounts", () => {
    const bundles = CatalogStore.getBundles();
    expect(bundles.length).toBe(4);

    const bundleSlugs = bundles.map((b) => b.slug);
    expect(bundleSlugs).toContain("home-essentials-bundle");
    expect(bundleSlugs).toContain("travel-essentials-bundle");
    expect(bundleSlugs).toContain("everyday-reusables-bundle");
    expect(bundleSlugs).toContain("gift-bundle");

    bundles.forEach((bundle) => {
      expect(bundle.bundlePrice).toBeLessThan(bundle.regularPrice);
      expect(bundle.discountPercentage).toBeGreaterThan(0);
      expect(bundle.items.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("should accurately validate promo codes and minimum spend", () => {
    // Valid 10% promo
    const result10 = CatalogStore.validateDiscountCode("EARTHLY10", 1500);
    expect(result10.valid).toBe(true);
    expect(result10.discount?.value).toBe(10);

    // WELCOME20 with insufficient subtotal (<999)
    const resultWelcomeLow = CatalogStore.validateDiscountCode("WELCOME20", 500);
    expect(resultWelcomeLow.valid).toBe(false);

    // WELCOME20 with valid subtotal (>=999)
    const resultWelcomeValid = CatalogStore.validateDiscountCode("WELCOME20", 1200);
    expect(resultWelcomeValid.valid).toBe(true);

    // Invalid code
    const invalidResult = CatalogStore.validateDiscountCode("FAKECODE", 1000);
    expect(invalidResult.valid).toBe(false);
  });

  it("should generate lifestyle discovery recommendations with transparent reasons", () => {
    const recs = CatalogStore.discoverRecommendations(["Travel", "Kitchen"]);
    expect(recs.length).toBeGreaterThan(0);
    recs.forEach((rec) => {
      expect(rec.product).toBeDefined();
      expect(rec.matchScore).toBeGreaterThan(0);
      expect(rec.relevanceReason).toBeTruthy();
    });
  });

  it("should simulate safe order creation with unique tracking and order numbers", () => {
    const initialOrders = CatalogStore.getOrders();
    const newOrder = CatalogStore.createOrder({
      customer: {
        fullName: "Testing User",
        email: "test@earthly.store",
        phone: "+91 98765 00000",
      },
      shippingAddress: {
        id: "addr-test",
        fullName: "Testing User",
        street: "123 Eco Way",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560001",
        country: "India",
        phone: "+91 98765 00000",
      },
      items: [
        {
          productId: "prod-1",
          name: "PureSteel Water Bottle",
          price: 999,
          quantity: 1,
          image: "https://example.com/bottle.jpg",
        },
      ],
      subtotal: 999,
      discountAmount: 0,
      shippingFee: 0,
      total: 999,
      status: "Processing",
      payment: {
        method: "UPI",
        status: "DemoVerified",
        transactionRef: "DEMO-TEST-123",
      },
    });

    expect(newOrder.id).toBeDefined();
    expect(newOrder.orderNumber).toMatch(/^EARTH-\d+/);
    expect(newOrder.trackingNumber).toBeDefined();
  });
});
