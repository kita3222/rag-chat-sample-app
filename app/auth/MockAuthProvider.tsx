"use client";

import React, { ReactNode } from "react";
import { AuthContext, User } from "./AuthProvider";

interface MockAuthProviderProps {
  children: ReactNode;
  authState?: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
}

export function MockAuthProvider({
  children,
  authState = {
    user: {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
    },
    loading: false,
    error: null,
  },
}: MockAuthProviderProps) {
  // モックのログイン、サインアップ、ログアウト関数
  const login = async () => {};
  const signup = async () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
