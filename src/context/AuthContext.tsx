"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "@/types";
import { CatalogStore } from "@/lib/store/catalogStore";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (fullName: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  toggleRole: () => void;
  updateUser: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Initialize with demo user by default
    setUser(CatalogStore.getUser());
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const existing = CatalogStore.getUser();
    const updated = {
      ...existing,
      email,
    };
    CatalogStore.updateUserProfile(updated);
    setUser(updated);
    return true;
  };

  const register = async (fullName: string, email: string): Promise<boolean> => {
    const updated: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone: "+91 98765 00000",
      role: "customer",
      createdAt: new Date().toISOString(),
      addresses: [],
    };
    CatalogStore.updateUserProfile(updated);
    setUser(updated);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    if (!user) return;
    const nextRole = user.role === "admin" ? "customer" : "admin";
    const updated: UserProfile = { ...user, role: nextRole };
    CatalogStore.updateUserProfile(updated);
    setUser(updated);
  };

  const updateUser = (profile: Partial<UserProfile>) => {
    CatalogStore.updateUserProfile(profile);
    setUser(CatalogStore.getUser());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        toggleRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
