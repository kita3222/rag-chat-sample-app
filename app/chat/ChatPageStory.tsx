"use client";

import React, { useState } from "react";
import styled from "styled-components";
import AppLayout from "../components/layouts/AppLayout";
import ChatInterface from "../features/rag-chat/components/ChatInterface";
import Card from "../components/Card/Card";
import Sidebar from "../components/layouts/Sidebar/Sidebar";
import { MockAuthProvider } from "../auth/MockAuthProvider";

// タイプ定義
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
const mockConversations = [
  {
    id: "conv1",
    title: "プロジェクトについての質問",
    date: "2023/03/24 12:30",
    isActive: true,
  },
  {
    id: "conv2",
    title: "ドキュメント検索の質問",
    date: "2023/03/23 15:45",
    isActive: false,
  },
  {
    id: "conv3",
    title: "データベース連携について",
    date: "2023/03/22 09:20",
    isActive: false,
  },
];

// スタイル定義
const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 140px);
  position: relative;
`;

const ChatPanel = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  padding: var(--space-4);
`;

// Storybook用のコンポーネント
export default function ChatPageStory() {
  const [conversations, setConversations] = useState(mockConversations);

  // 会話を選択するハンドラー
  const handleSelectConversation = (id: string) => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        isActive: conv.id === id,
      }))
    );
  };

  // 新しい会話を作成するハンドラー
  const handleNewConversation = () => {
    const newId = `conv${conversations.length + 1}`;
    const newConversation = {
      id: newId,
      title: `新しい会話 ${conversations.length + 1}`,
      date: new Date()
        .toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(/\//g, "/"),
      isActive: true,
    };

    setConversations([
      newConversation,
      ...conversations.map((conv) => ({ ...conv, isActive: false })),
    ]);
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
          <Sidebar
            conversations={conversations}
            onConversationSelect={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />

          <ChatPanel>
            <ChatInterface
              title="Almondo RAG アシスタント"
              initialMessages={mockMessages}
              onNewMessage={() => Promise.resolve()}
              onReset={() => {}}
              onSettingsClick={() => {}}
            />
          </ChatPanel>
        </ChatContainer>
      </AppLayout>
    </MockAuthProvider>
  );
}
