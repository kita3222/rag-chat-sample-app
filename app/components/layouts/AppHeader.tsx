"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { useAuth } from "../../auth/AuthProvider";
import Button from "../Button/Button";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-md);
  color: var(--color-gray-900);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const LogoIcon = styled.div`
  background-color: var(--color-primary);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${(props) =>
    props.$active ? "var(--color-primary)" : "var(--color-gray-700)"};
  font-size: var(--font-size-sm);
  text-decoration: none;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast) var(--transition-timing);
  font-weight: ${(props) =>
    props.$active
      ? "var(--font-weight-semibold)"
      : "var(--font-weight-medium)"};

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const UserInfo = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary-10);
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

export default function AppHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <HeaderWrapper>
      <Link href={user ? "/chat" : "/auth/login"} passHref>
        <Logo>
          <LogoIcon>A</LogoIcon>
          <span>Almondo RAG Chat</span>
        </Logo>
      </Link>

      <Navigation>
        <NavLink href="/chat" $active={isActive("/chat")}>
          チャット
        </NavLink>

        {user && (
          <>
            {user.role === "admin" && (
              <>
                <NavLink
                  href="/admin/knowledge"
                  $active={isActive("/admin/knowledge")}
                >
                  ナレッジベース
                </NavLink>
                <NavLink href="/admin/users" $active={isActive("/admin/users")}>
                  ユーザー管理
                </NavLink>
              </>
            )}
          </>
        )}
      </Navigation>

      <UserSection>
        {user ? (
          <>
            <UserInfo>
              <UserAvatar>{getInitials(user.name)}</UserAvatar>
              <span>{user.name}</span>
            </UserInfo>
            <Button
              size={Button.SIZES.SMALL}
              variant={Button.VARIANTS.GHOST}
              onClick={logout}
            >
              ログアウト
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login" passHref>
              <Button size={Button.SIZES.SMALL} variant={Button.VARIANTS.GHOST}>
                ログイン
              </Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button
                size={Button.SIZES.SMALL}
                variant={Button.VARIANTS.PRIMARY}
              >
                サインアップ
              </Button>
            </Link>
          </>
        )}
      </UserSection>
    </HeaderWrapper>
  );
}
