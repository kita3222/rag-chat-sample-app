"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ユーザータイプの定義
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

// 認証コンテキストの型定義
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// デフォルト値
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  error: null,
};

// コンテキスト作成
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// コンテキストを使用するためのカスタムフック
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初期ロード時にユーザー情報を取得（ローカルストレージから）
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to restore auth state:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ログイン処理
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // 本来はAPIリクエストを行うべきですが、デモ用に簡略化
      // await api.login(email, password)

      // デモ用のモックユーザー
      if (email === "admin@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        };

        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
      } else if (email === "user@example.com" && password === "password") {
        const mockUser: User = {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "user",
        };

        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // サインアップ処理
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // 本来はAPIリクエストを行うべきですが、デモ用に簡略化
      // await api.signup(name, email, password)

      // デモ用のモックユーザー
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "user",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "サインアップに失敗しました"
      );
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // コンテキスト値
  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
