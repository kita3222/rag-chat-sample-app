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
  position: relative;
`;

const Main = styled.main<{ $hasSidebar: boolean }>`
  flex: 1;
  overflow: auto;
  height: 100%;
  padding: var(--space-6);

  @media (max-width: 768px) {
    padding: var(--space-4);
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
          <Sidebar
            conversations={conversations}
            onConversationSelect={onConversationSelect}
            onNewConversation={onNewConversation}
          />
        )}

        <Main $hasSidebar={showSidebar}>{children}</Main>
      </MainContainer>

      {showFooter && (
        <Footer companyName="Almondo Inc." showVersion={true} version="1.0.0" />
      )}
    </LayoutContainer>
  );
};

export default Layout;
