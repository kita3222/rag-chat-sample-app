import React from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import Link from "next/link";
import AppLayout from "../components/layouts/AppLayout";
import { MockAuthProvider } from "../auth/MockAuthProvider";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const AdminMenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
`;

const MenuCard = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MenuIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: var(--color-primary-10);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
  color: var(--color-primary);
  font-size: var(--font-size-xl);
`;

const MenuTitle = styled.h2`
  font-size: var(--font-size-lg);
  margin: 0;
  margin-bottom: var(--space-1);
`;

const MenuDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
`;

export default function AdminPage() {
  // 管理メニュー項目
  const menuItems = [
    {
      id: "users",
      title: "ユーザー管理",
      description: "ユーザーの追加、編集、権限管理を行います",
      icon: "👤",
      link: "/admin/users",
    },
    {
      id: "knowledge",
      title: "ナレッジベース管理",
      description: "RAGで参照するドキュメントやFAQの登録・管理を行います",
      icon: "📚",
      link: "/admin/knowledge",
    },
    {
      id: "stats",
      title: "統計情報",
      description: "システムの利用状況や統計を確認します",
      icon: "📊",
      link: "/admin/stats",
    },
    {
      id: "settings",
      title: "システム設定",
      description: "システム全体の設定を行います",
      icon: "⚙️",
      link: "/admin/settings",
    },
  ];

  return (
    <MockAuthProvider
      authState={{
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        },
        loading: false,
        error: null,
      }}
    >
      <AppLayout>
        <Breadcrumb items={[]} title="管理パネル" />

        <AdminMenuContainer>
          {menuItems.map((item) => (
            <MenuLink href={item.link} key={item.id}>
              <MenuCard variant={Card.VARIANTS.ELEVATED}>
                <MenuIcon>{item.icon}</MenuIcon>
                <MenuTitle>{item.title}</MenuTitle>
                <MenuDescription>{item.description}</MenuDescription>
              </MenuCard>
            </MenuLink>
          ))}
        </AdminMenuContainer>
      </AppLayout>
    </MockAuthProvider>
  );
}
