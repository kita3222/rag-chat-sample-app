import React from "react";
import styled from "styled-components";
import Button, { VARIANTS, SIZES } from "../../Button";

interface SidebarProps {
  conversations?: Array<{
    id: string;
    title: string;
    date: string;
    isActive?: boolean;
  }>;
  onConversationSelect?: (id: string) => void;
  onNewConversation?: () => void;
}

const SidebarContainer = styled.aside`
  width: 280px;
  background-color: var(--color-white);
  border-right: var(--border-width-thin) solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    width: 240px;
  }
`;

const SidebarHeader = styled.div`
  padding: var(--space-3);
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
`;

const ConversationItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background-color: ${(props) =>
    props.isActive ? "var(--color-primary-10)" : "transparent"};
  border: none;
  border-radius: var(--border-radius-md);
  text-align: left;
  cursor: pointer;
  margin-bottom: var(--space-1);

  &:hover {
    background-color: ${(props) =>
      props.isActive ? "var(--color-primary-20)" : "var(--color-gray-100)"};
  }
`;

const ConversationTitle = styled.div`
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-900);
  font-size: var(--font-size-sm);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ConversationDate = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  margin-top: var(--space-1);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  text-align: center;
  color: var(--color-gray-500);
  height: 100%;
`;

const Sidebar: React.FC<SidebarProps> = ({
  conversations = [],
  onConversationSelect,
  onNewConversation,
}) => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Button
          fullWidth
          onClick={onNewConversation}
          variant={VARIANTS.PRIMARY}
          size={SIZES.MEDIUM}
        >
          新しい会話
        </Button>
      </SidebarHeader>

      <ConversationList>
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              isActive={conversation.isActive}
              onClick={() => onConversationSelect?.(conversation.id)}
            >
              <ConversationTitle>{conversation.title}</ConversationTitle>
              <ConversationDate>{conversation.date}</ConversationDate>
            </ConversationItem>
          ))
        ) : (
          <EmptyState>
            <p>会話履歴はありません</p>
            <p>新しい会話を開始してください</p>
          </EmptyState>
        )}
      </ConversationList>
    </SidebarContainer>
  );
};

export default Sidebar;
