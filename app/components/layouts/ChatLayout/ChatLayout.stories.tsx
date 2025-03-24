import type { Meta, StoryObj } from "@storybook/react";
import ChatLayout from "./ChatLayout";

const meta: Meta<typeof ChatLayout> = {
  title: "Layouts/ChatLayout",
  component: ChatLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    conversations: { control: "object" },
    onConversationSelect: { action: "conversation selected" },
    onNewConversation: { action: "new conversation" },
    showSidebar: { control: "boolean" },
    headerTitle: { control: "text" },
    onSettingsClick: { action: "settings clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

const sampleConversations = [
  {
    id: "1",
    title: "新しい会話",
    date: "2023年3月24日",
    isActive: true,
  },
  {
    id: "2",
    title: "RAGについての質問",
    date: "2023年3月23日",
    isActive: false,
  },
  {
    id: "3",
    title: "データ分析とAIの連携方法",
    date: "2023年3月22日",
    isActive: false,
  },
];

const DummyChatInterface = () => (
  <div
    style={{
      backgroundColor: "var(--color-white)",
      border: "1px solid var(--color-gray-200)",
      borderRadius: "var(--border-radius-lg)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        padding: "1rem",
        borderBottom: "1px solid var(--color-gray-200)",
        fontWeight: "bold",
      }}
    >
      チャットインターフェース
    </div>
    <div
      style={{
        flex: 1,
        padding: "1rem",
        backgroundColor: "var(--color-gray-50)",
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: "0.75rem",
          backgroundColor: "var(--color-primary-10)",
          borderRadius: "var(--border-radius-md)",
          marginBottom: "1rem",
          maxWidth: "80%",
        }}
      >
        こんにちは、どのようにお手伝いできますか？
      </div>
      <div
        style={{
          padding: "0.75rem",
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--border-radius-md)",
          marginBottom: "1rem",
          maxWidth: "80%",
          marginLeft: "auto",
        }}
      >
        RAGチャットについて教えてください
      </div>
      <div
        style={{
          padding: "0.75rem",
          backgroundColor: "var(--color-primary-10)",
          borderRadius: "var(--border-radius-md)",
          maxWidth: "80%",
        }}
      >
        RAG（Retrieval Augmented
        Generation）は、生成AIモデルを情報検索で拡張する手法です。事前に用意した知識ベースから関連情報を検索し、その結果を基に回答を生成します。
      </div>
    </div>
    <div
      style={{
        padding: "1rem",
        borderTop: "1px solid var(--color-gray-200)",
      }}
    >
      <div
        style={{
          display: "flex",
          border: "1px solid var(--color-gray-300)",
          borderRadius: "var(--border-radius-md)",
          padding: "0.5rem",
        }}
      >
        <input
          type="text"
          placeholder="メッセージを入力..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
          }}
        />
        <button
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--border-radius-sm)",
            padding: "0.25rem 0.75rem",
            cursor: "pointer",
          }}
        >
          送信
        </button>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    conversations: sampleConversations,
    headerTitle: "Almondo RAG チャット",
    showSidebar: true,
    children: <DummyChatInterface />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    conversations: sampleConversations,
    headerTitle: "Almondo RAG チャット",
    showSidebar: false,
    children: <DummyChatInterface />,
  },
};

export const Mobile: Story = {
  args: {
    conversations: sampleConversations,
    headerTitle: "Almondo RAG チャット",
    showSidebar: false,
    children: <DummyChatInterface />,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
