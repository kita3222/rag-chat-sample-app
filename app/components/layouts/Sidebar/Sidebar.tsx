import React, { useState } from "react";
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
  overflow: hidden;

  @media (max-width: 768px) {
    width: 240px;
  }
`;

const SidebarHeader = styled.div`
  padding: var(--space-3);
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  width: 100%;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: var(--space-2);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: var(--space-1) var(--space-1) var(--space-1) var(--space-5);
  border: var(--border-width-thin) solid var(--color-gray-200);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  background-color: var(--color-gray-50);

  &::placeholder {
    color: var(--color-gray-500);
    padding-left: var(--space-2);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: var(--color-white);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--color-white);
  color: var(--color-gray-700);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
  padding-top: var(--space-3);
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
  margin-bottom: var(--space-2);

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
  margin-top: var(--space-2);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  text-align: center;
  color: var(--color-gray-500);
  height: 100%;
`;

// Search Icon
const SearchIconSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Plus Icon
const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4V20M4 12H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({
  conversations = [],
  onConversationSelect,
  onNewConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = searchQuery
    ? conversations.filter((conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SearchBar>
          <SearchInput>
            <SearchIcon>
              <SearchIconSvg />
            </SearchIcon>
            <Input
              type="text"
              placeholder="会話を検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>
          <AddButton onClick={onNewConversation} aria-label="新しい会話">
            <PlusIcon />
          </AddButton>
        </SearchBar>
      </SidebarHeader>

      <ConversationList>
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
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
            {searchQuery ? (
              <p>検索結果がありません</p>
            ) : (
              <>
                <p>会話履歴はありません</p>
                <p>新しい会話を開始してください</p>
              </>
            )}
          </EmptyState>
        )}
      </ConversationList>
    </SidebarContainer>
  );
};

export default Sidebar;
