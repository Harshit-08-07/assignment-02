"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, DiscountCode } from "@/types";
import { CatalogStore } from "@/lib/store/catalogStore";
import confetti from "canvas-confetti";

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  promoCode: DiscountCode | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "earthly_cart_items_v1";
const PROMO_STORAGE_KEY = "earthly_promo_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<DiscountCode | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPromo = window.localStorage.getItem(PROMO_STORAGE_KEY);
      if (savedPromo) {
        setPromoCode(JSON.parse(savedPromo));
      }
    } catch (e) {
      console.error("Cart loading error", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      if (promoCode) {
        window.localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promoCode));
      } else {
        window.localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Cart saving error", e);
    }
  }, [cart, promoCode, isInitialized]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const id = `${newItem.productId}-${newItem.variantId || "default"}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        const nextQty = Math.min(existing.quantity + newItem.quantity, newItem.maxStock || 99);
        return prev.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item));
      }
      return [...prev, { ...newItem, id }];
    });

    setIsOpen(true);

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#5B755A", "#849E83", "#E4DCD0"],
      });
    } catch {
      // Non-blocking if window not available
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = item.quantity + delta;
          if (nextQty <= 0) return null;
          if (nextQty > item.maxStock) return item;
          return { ...item, quantity: nextQty };
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
  };

  // Calculations
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (promoCode) {
    if (promoCode.type === "percentage") {
      discountAmount = Math.round((subtotal * promoCode.value) / 100);
    } else {
      discountAmount = Math.min(promoCode.value, subtotal);
    }
  }

  // Free shipping over ₹999; ₹99 otherwise (if cart has items)
  const shippingFee = cart.length === 0 ? 0 : subtotal >= 999 ? 0 : 99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromoCode = (code: string): boolean => {
    setPromoError(null);
    const result = CatalogStore.validateDiscountCode(code, subtotal);
    if (!result.valid || !result.discount) {
      setPromoError(result.error || "Invalid promo code");
      return false;
    }
    setPromoCode(result.discount);
    return true;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoError(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        promoCode,
        promoError,
        applyPromoCode,
        removePromoCode,
        itemCount,
        subtotal,
        discountAmount,
        shippingFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
