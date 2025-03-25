"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";
import ChatBubble from "../ChatBubble";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: var(--space-5);
`;

const MessageGroup = styled.div`
  margin: var(--space-5) 0;
  display: flex;
  flex-direction: column;
`;

const DateSeparator = styled.div`
  display: flex;
  align-items: center;
  margin: var(--space-5) 0;
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  text-align: center;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid var(--color-gray-200);
  }

  &::before {
    margin-right: var(--space-3);
  }

  &::after {
    margin-left: var(--space-3);
  }
`;

const TypingIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-gray-200);
  border-radius: 16px;
  width: fit-content;
  margin-top: var(--space-3);

  span {
    width: 8px;
    height: 8px;
    background-color: var(--color-gray-600);
    border-radius: 50%;
    display: inline-block;
    animation: typing 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }

  @keyframes typing {
    0%,
    80%,
    100% {
      transform: scale(0.4);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--color-gray-500);
  padding: var(--space-5);

  h3 {
    margin-bottom: var(--space-3);
    font-size: var(--font-size-lg);
  }

  p {
    max-width: 450px;
    line-height: 1.5;
  }
`;

interface MessageType {
  id?: string;
  content: string;
  sender: string;
  timestamp: string;
  source?: string;
  state?: string;
  errorMessage?: string;
}

interface MessageGroup {
  date: string;
  messages: MessageType[];
}

// メッセージをグループ化する関数
const groupMessagesByDate = (messages: MessageType[]): MessageGroup[] => {
  if (!messages || messages.length === 0) return [];

  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup = {
    date: new Date(messages[0].timestamp).toLocaleDateString(),
    messages: [messages[0]],
  };

  for (let i = 1; i < messages.length; i++) {
    const message = messages[i];
    const messageDate = new Date(message.timestamp).toLocaleDateString();

    if (messageDate === currentGroup.date) {
      currentGroup.messages.push(message);
    } else {
      groups.push(currentGroup);
      currentGroup = {
        date: messageDate,
        messages: [message],
      };
    }
  }

  groups.push(currentGroup);
  return groups;
};

// 日本語でフォーマットされた日付を返す関数
const formatDateJa = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return date.toLocaleDateString("ja-JP", options);
};

interface ErrorType {
  message?: string;
}

interface ChatHistoryProps {
  messages?: MessageType[];
  isLoading?: boolean;
  error?: ErrorType | null;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages = [],
  isLoading = false,
  error = null,
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが来たら、自動的に一番下までスクロール
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // メッセージが空の場合の表示
  if (messages.length === 0 && !isLoading) {
    return (
      <ChatContainer>
        <EmptyState>
          <h3>会話を始めましょう</h3>
          <p>
            質問や問い合わせ内容を入力してください。知識ベースを参照して回答します。
          </p>
        </EmptyState>
      </ChatContainer>
    );
  }

  // エラーがある場合の表示
  if (error) {
    return (
      <ChatContainer>
        <ChatBubble
          variant="SYSTEM"
          state="ERROR"
          timestamp={new Date().toISOString()}
          errorMessage={
            error.message ||
            "メッセージの送信中にエラーが発生しました。後でもう一度お試しください。"
          }
        >
          エラーが発生しました
        </ChatBubble>
      </ChatContainer>
    );
  }

  // メッセージをグループ化
  const messageGroups = groupMessagesByDate(messages);

  return (
    <ChatContainer>
      {messageGroups.map((group, groupIndex) => (
        <React.Fragment key={`group-${groupIndex}`}>
          <DateSeparator>{formatDateJa(group.date)}</DateSeparator>
          <MessageGroup>
            {group.messages.map((message, messageIndex) => (
              <ChatBubble
                key={`message-${messageIndex}`}
                variant={message.sender === "user" ? "USER" : "SYSTEM"}
                state={
                  (message.state as "DEFAULT" | "LOADING" | "ERROR") ||
                  "DEFAULT"
                }
                timestamp={message.timestamp}
                source={message.source}
                errorMessage={message.errorMessage}
              >
                {message.content}
              </ChatBubble>
            ))}
          </MessageGroup>
        </React.Fragment>
      ))}

      {isLoading && (
        <ChatBubble
          variant="SYSTEM"
          state="LOADING"
          timestamp={new Date().toISOString()}
        >
          回答を生成しています...
        </ChatBubble>
      )}

      <div ref={endOfMessagesRef} />
    </ChatContainer>
  );
};

export default ChatHistory;
