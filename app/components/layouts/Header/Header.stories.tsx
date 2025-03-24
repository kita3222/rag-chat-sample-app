import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Layouts/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: { control: "text" },
    onSettingsClick: { action: "settings clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "Almondo RAG チャット",
  },
};

export const WithSettingsButton: Story = {
  args: {
    title: "Almondo RAG チャット",
    onSettingsClick: () => console.log("Settings clicked"),
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "これは非常に長いタイトルで、モバイル表示でのレスポンシブ対応をテストするためのものです",
    onSettingsClick: () => console.log("Settings clicked"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
