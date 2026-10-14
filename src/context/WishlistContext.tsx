"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CatalogStore } from "@/lib/store/catalogStore";

interface WishlistContextType {
  favourites: string[];
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  favouriteCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    setFavourites(CatalogStore.getFavourites());
  }, []);

  const toggleFavourite = (productId: string) => {
    const isNowFav = CatalogStore.toggleFavourite(productId);
    setFavourites(CatalogStore.getFavourites());
  };

  const isFavourite = (productId: string) => favourites.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        favouriteCount: favourites.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
