import React, { ReactNode } from "react";

interface MockProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function MockProtectedRoute({
  children,
  adminOnly = false,
}: MockProtectedRouteProps) {
  return <>{children}</>;
}
