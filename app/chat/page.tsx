"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import AppLayout from "../components/layouts/AppLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
import ChatInterface from "../features/rag-chat/components/ChatInterface";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import { useAuth } from "../auth/AuthProvider";

// 会話タイプの定義
interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp: string;
  isSelected: boolean;
}

// メッセージタイプの定義
interface Message {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: string;
  sources?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

// チャットパネルのスタイル
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

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: var(--space-4);
`;

const EmptyStateTitle = styled.h2`
  color: var(--color-gray-800);
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-2);
`;

const EmptyStateDescription = styled.p`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  max-width: 400px;
  margin-bottom: var(--space-4);
`;

export default function ChatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );

  // 会話データの初期ロード（デモ用モックデータ）
  useEffect(() => {
    if (user) {
      // モックデータをロード
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

      setConversations(mockConversations);
      setActiveConversation("conv1");

      // 最初の会話のメッセージをロード
      const mockMessages: Message[] = [
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

      setMessages(mockMessages);
    }
  }, [user]);

  // 新しい会話を作成
  const handleNewConversation = () => {
    const newId = `conv_${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title: "新しい会話",
      timestamp: new Date().toLocaleString("ja-JP"),
      isSelected: true,
    };

    // 現在選択されている会話の選択を解除
    const updatedConversations = conversations.map((conv) => ({
      ...conv,
      isSelected: false,
    }));

    setConversations([newConversation, ...updatedConversations]);
    setActiveConversation(newId);
    setMessages([]);
  };

  // 会話を選択
  const handleSelectConversation = (id: string) => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        isSelected: conv.id === id,
      }))
    );
    setActiveConversation(id);

    // モックメッセージを設定（実際のアプリではAPIから取得）
    if (id === "conv1") {
      setMessages([
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
      ]);
    } else if (id === "conv2") {
      setMessages([
        {
          id: "msg1",
          content: "PDFからのテキスト抽出について教えてください",
          sender: "user",
          timestamp: "2023/03/23 15:45",
        },
        {
          id: "msg2",
          content:
            "PDFからテキストを抽出する方法はいくつかあります。主なアプローチを紹介します：\n\n1. **PyPDF2**: Pythonの一般的なPDFライブラリで、基本的なテキスト抽出が可能です。\n\n2. **PDFMiner**: より高度なPDF解析と抽出機能を提供するPythonライブラリです。\n\n3. **Apache Tika**: 様々な形式のドキュメントからテキスト抽出ができるJavaベースのライブラリです。\n\n4. **OCR（光学文字認識）**: PDFがスキャン画像の場合、TesseractなどのOCRツールを使用してテキストを抽出できます。\n\nPDFの構造によっては抽出が難しい場合もあります。特に表、グラフ、画像内のテキストなどは特別な処理が必要になることがあります。",
          sender: "system",
          timestamp: "2023/03/23 15:46",
          sources: [
            {
              title: "PDF処理ツール比較",
              url: "https://example.com/pdf-tools",
              snippet: "様々なPDF処理ライブラリの特徴と比較...",
            },
          ],
        },
      ]);
    } else if (id === "conv3") {
      setMessages([
        {
          id: "msg1",
          content: "ベクトルデータベースの比較について知りたいです",
          sender: "user",
          timestamp: "2023/03/22 09:20",
        },
        {
          id: "msg2",
          content:
            "主要なベクトルデータベースの比較情報をご紹介します：\n\n1. **Pinecone**: フルマネージドサービスで、スケーラビリティが高く、使いやすいAPIを提供しています。\n\n2. **Weaviate**: オープンソースのベクトルデータベースで、GraphQLインターフェースを持ちます。\n\n3. **Milvus**: 大規模分散システム向けに設計されたオープンソースのベクトルデータベースです。\n\n4. **FAISS (Facebook AI Similarity Search)**: Metaが開発した効率的な類似度検索ライブラリで、インメモリでの高速検索に優れています。\n\n5. **Qdrant**: Rustで書かれた高性能ベクトルデータベースで、フィルタリング機能が強力です。\n\n選択基準は、データ量、レイテンシ要件、スケーラビリティ、予算、および必要なクエリ機能によって異なります。",
          sender: "system",
          timestamp: "2023/03/22 09:21",
          sources: [
            {
              title: "ベクトルデータベース比較 2023",
              url: "https://example.com/vector-db-2023",
              snippet: "2023年最新のベクトルデータベース比較と選定ガイド...",
            },
            {
              title: "RAGシステムのためのデータベース選定",
              url: "https://example.com/rag-database-selection",
              snippet:
                "RAGシステム構築におけるデータベース選定の重要ポイント...",
            },
          ],
        },
      ]);
    } else {
      setMessages([]);
    }
  };

  // 新しいメッセージを処理
  const handleNewMessage = async (userMessage: Message) => {
    // 実際のアプリではここでAPIを呼び出してRAG処理を行います

    // デモ用のモック応答
    const mockResponse: Message = {
      id: `msg_${Date.now()}`,
      content: `「${userMessage.content}」についての回答をRAGシステムから生成します。これはデモ用のモック応答です。実際のアプリケーションでは、この部分でAPIを呼び出してRAG処理（検索と生成）を行います。`,
      sender: "system",
      timestamp: new Date().toISOString(),
      sources: [
        {
          title: "サンプルドキュメント",
          url: "https://example.com/sample",
          snippet: "これはサンプルの引用テキストです...",
        },
      ],
    };

    // メッセージを追加
    setMessages((prev) => [...prev, userMessage, mockResponse]);

    // 会話のタイトルとプレビューを更新
    if (activeConversation) {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                title:
                  userMessage.content.length > 30
                    ? userMessage.content.substring(0, 30) + "..."
                    : userMessage.content,
                lastMessage: userMessage.content,
                timestamp: new Date().toLocaleString("ja-JP"),
              }
            : conv
        )
      );
    }
  };

  // 会話リセット処理
  const handleReset = () => {
    setMessages([]);
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <ChatContainer>
          <SidebarContainer variant={Card.VARIANTS.FLAT}>
            <SidebarHeader>
              <Button
                onClick={handleNewConversation}
                fullWidth
                size={Button.SIZES.MEDIUM}
              >
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
            {activeConversation ? (
              <ChatInterface
                title="Almondo RAG アシスタント"
                initialMessages={messages.map((msg) => ({
                  id: msg.id,
                  content: msg.content,
                  sender: msg.sender,
                  timestamp: msg.timestamp,
                  sources: msg.sources,
                }))}
                onNewMessage={(msg) => {
                  const userMsg: Message = {
                    id: `msg_${Date.now()}`,
                    content: msg.content,
                    sender: "user",
                    timestamp: new Date().toISOString(),
                  };
                  handleNewMessage(userMsg);
                }}
                onReset={handleReset}
              />
            ) : (
              <EmptyStateContainer>
                <EmptyStateTitle>会話が選択されていません</EmptyStateTitle>
                <EmptyStateDescription>
                  左側のサイドバーから会話を選択するか、新しい会話を開始してください。
                </EmptyStateDescription>
                <Button onClick={handleNewConversation}>
                  新しい会話を開始
                </Button>
              </EmptyStateContainer>
            )}
          </ChatPanel>
        </ChatContainer>
      </AppLayout>
    </ProtectedRoute>
  );
}
