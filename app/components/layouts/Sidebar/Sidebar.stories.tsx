import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";
import { useState } from "react";

const meta: Meta<typeof Sidebar> = {
  title: "Layouts/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    conversations: { control: "object" },
    onConversationSelect: { action: "conversation selected" },
    onNewConversation: { action: "new conversation" },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex", position: "relative" }}>
        <Story />
        <div
          style={{
            flex: 1,
            padding: "1rem",
            background: "#f9fafb",
          }}
        >
          <h2>メインコンテンツエリア</h2>
          <p>サイドバーが左側に固定で表示されます。</p>
          <p>
            検索ボックスで会話を検索したり、右側の追加ボタンで新しい会話を開始できます。
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

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
  {
    id: "4",
    title:
      "非常に長いタイトルのテスト用会話で表示の省略とUIの動作を確認するためのサンプル",
    date: "2023年3月21日",
    isActive: false,
  },
];

export const Default: Story = {
  args: {
    conversations: sampleConversations,
  },
};

export const Empty: Story = {
  args: {
    conversations: [],
  },
};

export const WithManyConversations: Story = {
  args: {
    conversations: [
      ...sampleConversations,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `extra-${i + 5}`,
        title: `過去の会話 ${i + 5}`,
        date: `2023年3月${20 - i}日`,
        isActive: false,
      })),
    ],
  },
};

// Interactive demo with state
export const InteractiveDemo = {
  render: () => {
    const InteractiveSidebar = () => {
      const [conversations, setConversations] = useState(sampleConversations);

      const handleNewConversation = () => {
        const newId = `new-${Date.now()}`;
        const newConversation = {
          id: newId,
          title: `新しい会話 ${conversations.length + 1}`,
          date: new Date().toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          isActive: true,
        };

        // Mark all conversations as inactive and add new one
        setConversations([
          newConversation,
          ...conversations.map((c) => ({ ...c, isActive: false })),
        ]);
      };

      const handleConversationSelect = (id: string) => {
        setConversations(
          conversations.map((c) => ({
            ...c,
            isActive: c.id === id,
          }))
        );
      };

      return (
        <Sidebar
          conversations={conversations}
          onNewConversation={handleNewConversation}
          onConversationSelect={handleConversationSelect}
        />
      );
    };

    return (
      <div style={{ height: "100vh", display: "flex", position: "relative" }}>
        <InteractiveSidebar />
        <div
          style={{
            flex: 1,
            padding: "1rem",
            background: "#f9fafb",
          }}
        >
          <h2>インタラクティブデモ</h2>
          <p>実際に操作してみてください：</p>
          <ul>
            <li>右上の「+」ボタンをクリックすると会話が追加されます</li>
            <li>会話をクリックすると選択状態になります</li>
            <li>検索ボックスに入力すると会話をフィルタリングできます</li>
          </ul>
        </div>
      </div>
    );
  },
};
