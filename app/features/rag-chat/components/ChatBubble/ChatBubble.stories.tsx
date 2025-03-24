import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChatBubble from "./ChatBubble";

const meta = {
  title: "Features/RAG Chat/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["user", "assistant"],
      description: "メッセージの送信者タイプ",
    },
    content: {
      control: "text",
      description: "メッセージの内容",
    },
    timestamp: {
      control: "date",
      description: "メッセージのタイムスタンプ",
    },
    isLoading: {
      control: "boolean",
      description: "ローディング状態",
    },
    hasError: {
      control: "boolean",
      description: "エラー状態",
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const UserMessage: Story = {
  args: {
    type: "user",
    content:
      "こんにちは！RAGチャットについて質問があります。どのように使用すればよいですか？",
    timestamp: new Date().toISOString(),
  },
};

export const AssistantMessage: Story = {
  args: {
    type: "assistant",
    content:
      "こんにちは！RAG（Retrieval Augmented Generation）チャットへようこそ。このアプリケーションでは、あなたの質問に対して、データベースから関連情報を検索し、それを基に回答を生成します。\n\n質問を入力するだけで、システムが自動的に関連ドキュメントを検索し、その情報を使って回答します。特定のトピックや詳細な質問にも対応できますので、お気軽にお試しください。",
    timestamp: new Date().toISOString(),
  },
};

export const LoadingState: Story = {
  args: {
    type: "assistant",
    content: "",
    isLoading: true,
    timestamp: new Date().toISOString(),
  },
};

export const ErrorState: Story = {
  args: {
    type: "assistant",
    content:
      "申し訳ありませんが、応答の生成中にエラーが発生しました。もう一度お試しください。",
    hasError: true,
    timestamp: new Date().toISOString(),
  },
};

export const Conversation: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <ChatBubble
        type="user"
        content="RAGとは何ですか？"
        timestamp={new Date(Date.now() - 5 * 60000).toISOString()}
      />

      <ChatBubble
        type="assistant"
        content="RAG（Retrieval Augmented Generation）は、情報検索と言語生成を組み合わせた技術です。質問に対して、まず関連する情報をデータベースから検索し、その結果を基に回答を生成します。これにより、最新の情報や特定のドメイン知識を含んだ正確な回答が可能になります。"
        timestamp={new Date(Date.now() - 4 * 60000).toISOString()}
      />

      <ChatBubble
        type="user"
        content="RAGの主な利点は何ですか？"
        timestamp={new Date(Date.now() - 3 * 60000).toISOString()}
      />

      <ChatBubble
        type="assistant"
        content="RAGの主な利点は以下の通りです：\n\n1. 最新情報へのアクセス：事前学習済みモデルの知識カットオフ後の情報も提供できます\n2. 情報源の透明性：回答の根拠となる情報源を示すことができます\n3. 特定ドメインへの特化：特定分野の専門知識を容易に組み込めます\n4. 幻覚の減少：根拠に基づいた回答生成により、AI特有の「幻覚」（事実と異なる情報の生成）を減らせます\n5. カスタマイズ性：組織固有のデータを活用した回答が可能です"
        timestamp={new Date(Date.now() - 2 * 60000).toISOString()}
      />

      <ChatBubble
        type="user"
        content="このアプリケーションではどのようなデータベースを使用していますか？"
        timestamp={new Date(Date.now() - 1 * 60000).toISOString()}
      />

      <ChatBubble
        type="assistant"
        isLoading={true}
        timestamp={new Date().toISOString()}
      />
    </div>
  ),
};

export const FormattedContent: Story = {
  args: {
    type: "assistant",
    content:
      "# RAGアーキテクチャの概要\n\n## 主要コンポーネント\n\n- **ドキュメントインデックス**: ベクターデータベースに保存された文書\n- **検索エンジン**: 意味的類似性に基づいてドキュメントを検索\n- **言語モデル**: 検索結果を利用して回答を生成\n\n```javascript\nasync function processQuery(query) {\n  // 1. ユーザークエリをベクトル化\n  const queryEmbedding = await embedText(query);\n  \n  // 2. 類似ドキュメントを検索\n  const relevantDocs = await vectorDb.similaritySearch(queryEmbedding);\n  \n  // 3. コンテキストと共に言語モデルに送信\n  const response = await llm.generate(query, relevantDocs);\n  \n  return response;\n}\n```\n\nRAGシステムの効果は、ドキュメントの品質と検索アルゴリズムの精度に大きく依存します。",
    timestamp: new Date().toISOString(),
  },
};
