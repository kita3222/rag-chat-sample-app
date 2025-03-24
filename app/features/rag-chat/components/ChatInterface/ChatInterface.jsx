"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";

const ChatInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

const Header = styled.div`
  padding: var(--space-4);
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);
  background-color: var(--color-primary-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: var(--space-2);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-700);
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-gray-100);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const HistoryContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 300px;
`;

const InputContainer = styled.div`
  padding: var(--space-3);
  border-top: var(--border-width-thin) solid var(--color-gray-200);
`;

// 簡易的なアイコンコンポーネント
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 4v6h6M23 20v-6h-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
      stroke="currentColor"
      strokeWidth="2"
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const generateUniqueId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const ChatInterface = ({
  title = "AI アシスタント",
  initialMessages = [],
  onNewMessage,
  onReset,
  onSettingsClick,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 外部からのメッセージ更新を監視
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // 新しいメッセージを送信する関数
  const handleSubmit = async ({ message, files }) => {
    if (!message.trim() && (!files || files.length === 0)) return;

    // ユーザーメッセージを追加
    const userMessage = {
      id: generateUniqueId(),
      content: message,
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
        const systemResponse = {
          id: generateUniqueId(),
          content: `「${message}」についてのお問い合わせを承りました。これはサンプル応答です。実際の実装では、この部分にRAGを使用した回答生成ロジックが入ります。`,
          sender: "system",
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, systemResponse]);
      }
    } catch (err) {
      setError({
        message: err.message || "回答の生成中にエラーが発生しました。",
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
      <Header>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderActions>
          <ActionButton
            onClick={handleReset}
            aria-label="会話をリセット"
            title="会話をリセット"
          >
            <RefreshIcon />
          </ActionButton>
          {onSettingsClick && (
            <ActionButton
              onClick={onSettingsClick}
              aria-label="設定"
              title="設定"
            >
              <SettingsIcon />
            </ActionButton>
          )}
        </HeaderActions>
      </Header>

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
          placeholder="質問を入力してください..."
        />
      </InputContainer>
    </ChatInterfaceContainer>
  );
};

export default ChatInterface;
