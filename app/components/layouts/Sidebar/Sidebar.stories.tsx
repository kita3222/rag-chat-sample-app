import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Layouts/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    conversations: { control: "object" },
    onConversationSelect: { action: "conversation selected" },
    onNewConversation: { action: "new conversation" },
  },
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
  parameters: {
    layout: "fullscreen",
  },
};
