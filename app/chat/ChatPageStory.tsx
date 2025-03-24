"use client";

import React, { useState } from "react";
import styled from "styled-components";
import AppLayout from "../components/layouts/AppLayout";
import ChatInterface from "../features/rag-chat/components/ChatInterface";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import { MockAuthProvider } from "../auth/MockAuthProvider";

// タイプ定義
interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp: string;
  isSelected: boolean;
}

interface MessageSource {
  title: string;
  url: string;
  snippet: string;
}

// モックメッセージ定義
const mockMessages = [
  {
    id: "msg1",
    content: "RAGシステムの構築方法について教えてください",
    sender: "user",
    timestamp: "2023/03/24 12:30",
  },
  {
    id: "msg2",
    content:
      "RAG（検索拡張生成）システムの構築方法についてご説明します。\n\nRAGシステムは主に以下のコンポーネントで構成されます：\n\n1. **ドキュメント処理パイプライン**: 様々なソースからドキュメントを収集し、チャンクに分割します。\n\n2. **埋め込みモデル**: テキストをベクトル表現に変換します。\n\n3. **ベクトルデータベース**: 埋め込みベクトルを保存し、効率的な類似度検索を可能にします。\n\n4. **検索エンジン**: ユーザーのクエリに対して関連ドキュメントを検索します。\n\n5. **生成AI**: 検索結果を参照しながら回答を生成します。\n\n実装するには、まず適切なドキュメント処理パイプラインを構築し、埋め込みモデル（例：OpenAI Ada）を選択して、ベクトルデータベース（例：Pinecone、Faiss）を設定します。その後、検索エンジンを実装し、大規模言語モデル（例：GPT-4）に検索結果とユーザークエリを提供して回答を生成します。",
    sender: "system",
    timestamp: "2023/03/24 12:31",
    sources: [
      {
        title: "RAG システム入門",
        url: "https://example.com/rag-introduction",
        snippet: "RAGシステムの基本構成と実装方法について解説します...",
      },
      {
        title: "ベクトルデータベース比較",
        url: "https://example.com/vector-db-comparison",
        snippet: "様々なベクトルデータベースの特徴と性能比較...",
      },
    ],
  },
];

// モック会話リスト
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    title: "プロジェクトについての質問",
    lastMessage: "RAGシステムの構築方法について教えてください",
    timestamp: "2023/03/24 12:30",
    isSelected: true,
  },
  {
    id: "conv2",
    title: "ドキュメント検索の質問",
    lastMessage: "PDFからのテキスト抽出について教えてください",
    timestamp: "2023/03/23 15:45",
    isSelected: false,
  },
  {
    id: "conv3",
    title: "データベース連携について",
    lastMessage: "ベクトルデータベースの比較について知りたいです",
    timestamp: "2023/03/22 09:20",
    isSelected: false,
  },
];

// スタイル定義
const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-4);
  height: calc(100vh - 140px);
`;

const SidebarContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: var(--space-3);
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2) 0;
`;

const ConversationItem = styled.div<{ $isSelected?: boolean }>`
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  margin: 0 var(--space-2);

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: var(--color-primary-10);
    color: var(--color-primary-dark);
  `}

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "var(--color-primary-20)" : "var(--color-gray-100)"};
  }
`;

const ConversationTitle = styled.div`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationPreview = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationTimestamp = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-top: var(--space-1);
`;

const ChatPanel = styled.div`
  height: 100%;
  overflow: hidden;
`;

// Storybook用のコンポーネント
export default function ChatPageStory() {
  const [conversations, setConversations] = useState(mockConversations);

  // 会話を選択するハンドラー（Storybook用にシンプル化）
  const handleSelectConversation = (id: string) => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        isSelected: conv.id === id,
      }))
    );
  };

  return (
    <MockAuthProvider
      authState={{
        user: {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "user",
        },
        loading: false,
        error: null,
      }}
    >
      <AppLayout>
        <ChatContainer>
          <SidebarContainer variant={Card.VARIANTS.DEFAULT}>
            <SidebarHeader>
              <Button onClick={() => {}} fullWidth size={Button.SIZES.MEDIUM}>
                新しい会話
              </Button>
            </SidebarHeader>
            <ConversationList>
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  $isSelected={conversation.isSelected}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <ConversationTitle>{conversation.title}</ConversationTitle>
                  {conversation.lastMessage && (
                    <ConversationPreview>
                      {conversation.lastMessage}
                    </ConversationPreview>
                  )}
                  <ConversationTimestamp>
                    {conversation.timestamp}
                  </ConversationTimestamp>
                </ConversationItem>
              ))}
            </ConversationList>
          </SidebarContainer>

          <ChatPanel>
            <ChatInterface
              title="Almondo RAG アシスタント"
              initialMessages={mockMessages}
              onNewMessage={() => {}}
              onReset={() => {}}
              onSettingsClick={() => {}}
            />
          </ChatPanel>
        </ChatContainer>
      </AppLayout>
    </MockAuthProvider>
  );
}
