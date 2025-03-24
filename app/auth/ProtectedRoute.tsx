"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // ユーザーが認証されていない場合、ログインページにリダイレクト
        router.push(`/auth/login?redirectTo=${pathname}`);
      } else if (adminOnly && user.role !== "admin") {
        // 管理者専用ページに一般ユーザーがアクセスした場合
        router.push("/");
      }
    }
  }, [user, loading, router, pathname, adminOnly]);

  // 読み込み中またはリダイレクト中は何も表示しない
  if (loading || !user || (adminOnly && user.role !== "admin")) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
