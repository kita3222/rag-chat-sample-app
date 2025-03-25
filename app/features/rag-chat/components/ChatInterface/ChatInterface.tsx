"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";

const ChatInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const HistoryContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  min-height: 300px;
  padding: var(--space-4) var(--space-4) var(--space-2);

  /* スクロールバースタイル - より洗練された印象に */
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

const InputContainer = styled.div`
  padding: var(--space-3) var(--space-4) var(--space-4);
  background-color: var(--color-white);
  border-top: var(--border-width-thin) solid var(--color-gray-200);
`;

// 簡易的なアイコンコンポーネント
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64l2.14-2.14M3 12a9 9 0 0 0 9 9 9 9 0 0 0 6.36-2.64l2.14 2.14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 3v6h-6M3 21v-6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface MessageType {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  source?: string;
  state?: string;
}

interface FileType {
  name: string;
  size: number;
  type: string;
  // その他のファイル関連の属性
}

const generateUniqueId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

interface ChatInterfaceProps {
  title?: string;
  initialMessages?: MessageType[];
  onNewMessage?: (message: MessageType, files?: FileType[]) => Promise<void>;
  onReset?: () => void;
  onSettingsClick?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = "AI アシスタント",
  initialMessages = [],
  onNewMessage,
  onReset,
  onSettingsClick,
}) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  // 外部からのメッセージ更新を監視
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // 新しいメッセージを送信する関数
  const handleSubmit = async ({
    content,
    files,
  }: {
    content: string;
    files: FileType[];
  }) => {
    if (!content.trim() && (!files || files.length === 0)) return;

    // ユーザーメッセージを追加
    const userMessage: MessageType = {
      id: generateUniqueId(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSubmitting(true);
    setError(null);

    try {
      // 外部ハンドラーが提供されている場合はそれを使用
      if (onNewMessage) {
        await onNewMessage(userMessage, files);
      } else {
        // デモモード：擬似的な応答を生成
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒待機

        // サンプル応答
        const systemResponse: MessageType = {
          id: generateUniqueId(),
          content: `「${content}」についてのお問い合わせを承りました。これはサンプル応答です。実際の実装では、この部分にRAGを使用した回答生成ロジックが入ります。`,
          sender: "system",
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, systemResponse]);
      }
    } catch (err) {
      setError({
        message:
          err instanceof Error
            ? err.message
            : "回答の生成中にエラーが発生しました。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // チャットをリセットする関数
  const handleReset = () => {
    if (
      window.confirm("会話履歴をリセットしますか？この操作は元に戻せません。")
    ) {
      setMessages([]);
      setError(null);

      if (onReset) {
        onReset();
      }
    }
  };

  return (
    <ChatInterfaceContainer>
      <HistoryContainer>
        <ChatHistory
          messages={messages}
          isLoading={isSubmitting}
          error={error}
        />
      </HistoryContainer>

      <InputContainer>
        <ChatInput
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          disabled={false}
          placeholder="メッセージを入力..."
        />
      </InputContainer>
    </ChatInterfaceContainer>
  );
};

export default ChatInterface;
