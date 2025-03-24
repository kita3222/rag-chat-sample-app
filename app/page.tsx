"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth/AuthProvider";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // 認証済みならチャット画面へ、未認証ならログイン画面へリダイレクト
      if (user) {
        router.push("/chat");
      } else {
        router.push("/auth/login");
      }
    }
  }, [user, loading, router]);

  // リダイレクト処理中は何も表示しない（もしくはローディング表示）
  return null;
}
