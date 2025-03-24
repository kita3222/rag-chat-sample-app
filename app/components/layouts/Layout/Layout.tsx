import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  headerTitle?: string;
  onSettingsClick?: () => void;
  conversations?: Array<{
    id: string;
    title: string;
    date: string;
    isActive: boolean;
  }>;
  onConversationSelect?: (id: string) => void;
  onNewConversation?: () => void;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-gray-50);
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 64px);
`;

const SidebarContainer = styled.div`
  width: 280px;
  height: 100%;
  border-right: 1px solid var(--color-gray-200);
  background-color: var(--color-white);
  overflow-y: auto;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 64px;
    left: 0;
    z-index: 10;
    transform: translateX(-100%);

    &.visible {
      transform: translateX(0);
    }
  }
`;

const ContentContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-5);

  @media (max-width: 768px) {
    padding: var(--space-3);
  }
`;

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showSidebar = true,
  headerTitle = "Almondo App",
  onSettingsClick,
  conversations = [],
  onConversationSelect,
  onNewConversation,
}) => {
  return (
    <LayoutContainer>
      {showHeader && (
        <Header title={headerTitle} onSettingsClick={onSettingsClick} />
      )}

      <MainContainer>
        {showSidebar && (
          <SidebarContainer className={showSidebar ? "visible" : ""}>
            <Sidebar
              conversations={conversations}
              onConversationSelect={onConversationSelect}
              onNewConversation={onNewConversation}
            />
          </SidebarContainer>
        )}

        <ContentContainer>{children}</ContentContainer>
      </MainContainer>

      {showFooter && (
        <Footer companyName="Almondo Inc." showVersion={true} version="1.0.0" />
      )}
    </LayoutContainer>
  );
};

export default Layout;
