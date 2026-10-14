import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s]+$/, "Please provide a valid contact number"),
  street: z.string().min(5, "Street address must be at least 5 characters"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City name is required"),
  state: z.string().min(2, "State name is required"),
  postalCode: z.string().min(4, "Postal / PIN code must be at least 4 digits"),
  country: z.string().default("India"),
  paymentMethod: z.enum(["UPI", "Card", "NetBanking", "COD"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  tagline: z.string().min(5, "Tagline is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum([
    "Home Essentials",
    "Travel Accessories",
    "Kitchen Products",
    "Work and Stationery",
    "Reusable Drinkware",
    "Gift Bundles",
    "Everyday Essentials",
  ]),
  price: z.number().min(1, "Price must be greater than zero"),
  compareAtPrice: z.number().optional(),
  inventoryCount: z.number().min(0, "Inventory cannot be negative"),
  imageUrl: z.string().url("Valid image URL required"),
  materials: z.string().min(3, "Materials description required"),
  originRegion: z.string().min(2, "Origin region is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
