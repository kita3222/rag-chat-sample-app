import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChatInterface from "./ChatInterface";

const meta = {
  title: "Features/RAG Chat/ChatInterface",
  component: ChatInterface,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatInterface>;

export default meta;
type Story = StoryObj<typeof ChatInterface>;

export const Default: Story = {
  args: {},
};

export const WithPredefinedMessages: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const ChatInterfaceWithMessages = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          type: "assistant" as const,
          content:
            "こんにちは！RAGチャットへようこそ。何かお手伝いできることはありますか？",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          id: "2",
          type: "user" as const,
          content: "RAGについて簡単に説明してください。",
          timestamp: new Date(Date.now() - 45000).toISOString(),
        },
        {
          id: "3",
          type: "assistant" as const,
          content:
            "RAG（Retrieval Augmented Generation）は、情報検索と生成AIを組み合わせた技術です。\n\nRAGの基本的な仕組みは以下の通りです：\n\n1. ユーザーが質問を入力\n2. システムが関連ドキュメントをデータベースから検索\n3. 検索結果を元に、AIが回答を生成\n\nこの方法の利点は、AIが自身の知識だけでなく、外部の最新かつ正確な情報源に基づいて回答できることです。特に事実に基づく回答や、AIの訓練データに含まれていない専門的な情報が必要な場合に有効です。",
          timestamp: new Date(Date.now() - 30000).toISOString(),
        },
      ]);
      const [isLoading, setIsLoading] = React.useState(false);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            type: "user" as const,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // ローディング状態を設定
        setIsLoading(true);

        // AIの応答をシミュレート
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now() + 1),
              type: "assistant" as const,
              content: `あなたの質問「${message}」に対する応答です。RAGチャットのデモ応答として、この内容がAIによって生成されたと想定してください。`,
              timestamp: new Date().toISOString(),
            },
          ]);
        }, 2000);
      };

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={isLoading}
        />
      );
    };

    return <ChatInterfaceWithMessages />;
  },
};

export const EmptyState: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const EmptyChatInterface = () => {
      const [messages, setMessages] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(false);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev: any[]) => [
          ...prev,
          {
            id: String(Date.now()),
            type: "user" as const,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // ローディング状態を設定
        setIsLoading(true);

        // AIの応答をシミュレート
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev: any[]) => [
            ...prev,
            {
              id: String(Date.now() + 1),
              type: "assistant" as const,
              content: `あなたの質問「${message}」に対する応答です。RAGチャットのデモ応答として、この内容がAIによって生成されたと想定してください。`,
              timestamp: new Date().toISOString(),
            },
          ]);
        }, 2000);
      };

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={isLoading}
        />
      );
    };

    return <EmptyChatInterface />;
  },
};

export const LoadingState: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const LoadingChatInterface = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          type: "user" as const,
          content: "RAGシステムでは、どのような種類のデータを検索できますか？",
          timestamp: new Date().toISOString(),
        },
      ]);

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={() => {}}
          isLoading={true}
        />
      );
    };

    return <LoadingChatInterface />;
  },
};

export const WithError: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const ErrorChatInterface = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          type: "user" as const,
          content: "RAGシステムでは、どのような種類のデータを検索できますか？",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
      ]);
      const [hasError, setHasError] = React.useState(true);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev: any[]) => [
          ...prev,
          {
            id: String(Date.now()),
            type: "user" as const,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // エラー状態をリセット
        setHasError(false);
      };

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={false}
          hasError={hasError}
        />
      );
    };

    return <ErrorChatInterface />;
  },
};
