import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import ChatLayout from "./ChatLayout";

const meta: Meta<typeof ChatLayout> = {
  title: "Layouts/ChatLayout",
  component: ChatLayout,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/chat",
      },
    },
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

const mockConversations = [
  {
    id: "1",
    title: "RAGシステムについて",
    date: "2023年6月1日",
    isActive: true,
  },
  {
    id: "2",
    title: "Next.jsの使い方",
    date: "2023年6月2日",
    isActive: false,
  },
  {
    id: "3",
    title: "データベース設計",
    date: "2023年6月3日",
    isActive: false,
  },
];

export const Default: Story = {
  args: {
    conversations: mockConversations,
    showSidebar: true,
    headerTitle: "チャット",
    children: (
      <div style={{ padding: "2rem", height: "100%" }}>
        <h1>チャットコンテンツ</h1>
        <p>ここに会話内容が表示されます。</p>
      </div>
    ),
  },
};

export const WithoutSidebar: Story = {
  args: {
    conversations: mockConversations,
    showSidebar: false,
    headerTitle: "新しい会話",
    children: (
      <div style={{ padding: "2rem", height: "100%" }}>
        <h1>新しい会話</h1>
        <p>サイドバーなしのチャットビュー</p>
      </div>
    ),
  },
};
