"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppLayout from "../components/layouts/AppLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
import Chat from "../components/Chat";
import NewChatButton from "../components/NewChatButton";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import { useAuth } from "../auth/AuthProvider";
import { FiPlusCircle, FiMessageSquare } from "react-icons/fi";
import { formatDate } from "../utils/date";

// 会話タイプの定義
interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

// メインコンテナ - ページ全体のレイアウト
const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: calc(100vh - 140px);
  background-color: var(--color-gray-50);
`;

// サイドバーコンテナ - 左側のナビゲーション領域
const SidebarContainer = styled.div`
  background-color: var(--color-white);
  border-right: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
`;

// サイドバーヘッダー - 新規チャット作成ボタンを含む領域
const SidebarHeader = styled.div`
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-gray-200);
`;

// 新規チャットボタン - サイドバー上部の新しい会話作成ボタン
const NewChatWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-3);
    color: var(--color-gray-900);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius-md);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast) var(--transition-timing);

    &:hover {
      background-color: var(--color-gray-100);
      text-decoration: none;
    }

    svg {
      flex-shrink: 0;
    }
  }
`;

// 会話リストのコンテナ
const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2) 0;

  /* スクロールバーのスタイリング */
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-300) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-300);
    border-radius: 20px;
  }
`;

// 個別の会話アイテム
const ConversationItem = styled.div<{ $isSelected?: boolean }>`
  padding: var(--space-2) var(--space-4);
  margin: 0 var(--space-2) var(--space-1) var(--space-2);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing);
  background-color: ${(props) =>
    props.$isSelected ? "var(--color-primary-5)" : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? "var(--color-primary-10)" : "var(--color-gray-100)"};
  }
`;

// 会話アイコン
const ConversationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--color-gray-500);
  flex-shrink: 0;
  margin-top: 2px;
`;

// 会話の詳細情報
const ConversationDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

// 会話のタイトル
const ConversationTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: var(--space-1);
`;

// 会話のプレビュー
const ConversationPreview = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 会話の最終更新日時
const ConversationTimestamp = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-top: var(--space-1);
`;

// メインコンテンツ領域 - チャットの表示領域
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
`;

// 空の状態を表示するコンテナ
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--space-6);
  text-align: center;
  color: var(--color-gray-600);
  background-color: var(--color-white);
`;

// 空の状態のタイトル
const EmptyStateTitle = styled.h2`
  margin-bottom: var(--space-4);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
`;

// 空の状態の説明文
const EmptyStateDescription = styled.p`
  margin-bottom: var(--space-5);
  max-width: 32rem;
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  color: var(--color-gray-600);
`;

// 空の状態の新規チャットボタン
const EmptyStateButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-fast) var(--transition-timing);

  &:hover {
    background-color: var(--color-primary-dark);
    text-decoration: none;
  }
`;

const getTitle = (message: any): string => {
  if (!message) {
    return "新しいチャット";
  }

  const content = message.content;
  // タイトルとして表示する最大文字数
  const maxLength = 30;

  // 内容が長い場合は省略
  if (content.length > maxLength) {
    return `${content.substring(0, maxLength)}...`;
  }

  return content;
};

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("id");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("/api/conversations");
        if (response.ok) {
          const data = await response.json();
          setConversations(data);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authState.isLoggedIn) {
      fetchConversations();
    } else {
      setLoading(false);
    }
  }, [authState.isLoggedIn]);

  // 新しい会話を作成
  const handleCreateConversation = async () => {
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newConversation = await response.json();
        router.push(`/chat?id=${newConversation.id}`);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <ChatContainer>
          <SidebarContainer>
            <SidebarHeader>
              <NewChatWrapper>
                <Link href="/chat" onClick={handleCreateConversation}>
                  <FiPlusCircle size={16} />
                  新しいチャット
                </Link>
              </NewChatWrapper>
            </SidebarHeader>

            <ConversationList>
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  $isSelected={conversationId === conversation.id}
                  onClick={() => router.push(`/chat?id=${conversation.id}`)}
                >
                  <Link
                    href={`/chat?id=${conversation.id}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "var(--space-2)",
                      color:
                        conversationId === conversation.id
                          ? "var(--color-primary)"
                          : "var(--color-gray-800)",
                      textDecoration: "none",
                    }}
                  >
                    <ConversationIcon>
                      <FiMessageSquare size={16} />
                    </ConversationIcon>
                    <ConversationDetails>
                      <ConversationTitle>
                        {conversation.title}
                      </ConversationTitle>
                      <ConversationPreview>
                        {conversation.lastMessage}
                      </ConversationPreview>
                      <ConversationTimestamp>
                        {formatDate(conversation.updatedAt)}
                      </ConversationTimestamp>
                    </ConversationDetails>
                  </Link>
                </ConversationItem>
              ))}
            </ConversationList>
          </SidebarContainer>

          <MainContent>
            {conversationId ? (
              <Chat conversationId={conversationId} />
            ) : (
              <EmptyStateContainer>
                <EmptyStateTitle>チャットを始めましょう</EmptyStateTitle>
                <EmptyStateDescription>
                  AIアシスタントにどんな質問でもしてみてください。プログラミング、データ分析、文章作成など、さまざまな分野でサポートします。
                </EmptyStateDescription>
                <EmptyStateButton
                  as={Link}
                  href="/chat"
                  onClick={handleCreateConversation}
                >
                  <FiPlusCircle size={18} />
                  新しいチャットを始める
                </EmptyStateButton>
              </EmptyStateContainer>
            )}
          </MainContent>
        </ChatContainer>
      </AppLayout>
    </ProtectedRoute>
  );
}
