"use client";

import React, { ReactNode } from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";

interface AppLayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-gray-50);
`;

const MainContent = styled.main`
  flex: 1;
  padding: var(--space-5);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Footer = styled.footer`
  padding: var(--space-4) var(--space-5);
  border-top: var(--border-width-thin) solid var(--color-gray-200);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
`;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <LayoutContainer>
      <AppHeader />
      <MainContent>{children}</MainContent>
      <Footer>
        <p>
          © {new Date().getFullYear()} Almondo RAG Chat. All rights reserved.
        </p>
      </Footer>
    </LayoutContainer>
  );
}
