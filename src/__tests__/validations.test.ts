import { describe, it, expect } from "vitest";
import { checkoutSchema, newsletterSchema, contactSchema } from "../lib/validations";

describe("EARTHLY Zod Input Validation Schemas", () => {
  it("should validate complete checkout data", () => {
    const validData = {
      fullName: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 9876543210",
      street: "12 Palm Grove Road",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
      paymentMethod: "UPI" as const,
    };
    const result = checkoutSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject checkout data with invalid email or missing street", () => {
    const invalidData = {
      fullName: "P",
      email: "not-an-email",
      phone: "123",
      street: "",
      city: "M",
      state: "M",
      postalCode: "12",
      country: "India",
      paymentMethod: "UPI" as const,
    };
    const result = checkoutSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should validate newsletter email", () => {
    expect(newsletterSchema.safeParse({ email: "eco@conscious.in" }).success).toBe(true);
    expect(newsletterSchema.safeParse({ email: "invalid-email" }).success).toBe(false);
  });

  it("should validate contact form fields", () => {
    expect(
      contactSchema.safeParse({
        name: "Rohan",
        email: "rohan@test.com",
        subject: "Bulk Order",
        message: "We would like to order 50 stainless bottles for corporate gifts.",
      }).success
    ).toBe(true);

    expect(
      contactSchema.safeParse({
        name: "",
        email: "rohan",
        subject: "",
        message: "short",
      }).success
    ).toBe(false);
  });
});
