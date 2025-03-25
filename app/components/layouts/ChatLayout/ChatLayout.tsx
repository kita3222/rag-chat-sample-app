import React from "react";
import styled from "styled-components";
import Layout from "../Layout";

export interface ChatLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  showSidebar?: boolean;
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

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  padding: var(--space-4);
  width: 100%;
`;

const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  headerTitle = "チャット",
  showSidebar = true,
  onSettingsClick,
  conversations = [],
  onConversationSelect,
  onNewConversation,
}) => {
  return (
    <Layout
      headerTitle={headerTitle}
      showSidebar={showSidebar}
      showHeader={true}
      showFooter={true}
      onSettingsClick={onSettingsClick}
      conversations={conversations}
      onConversationSelect={onConversationSelect}
      onNewConversation={onNewConversation}
    >
      <ChatContainer>{children}</ChatContainer>
    </Layout>
  );
};

export default ChatLayout;
