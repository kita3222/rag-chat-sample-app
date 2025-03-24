import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./Layout";

const meta: Meta<typeof Layout> = {
  title: "Layouts/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    showSidebar: { control: "boolean" },
    showHeader: { control: "boolean" },
    showFooter: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    showSidebar: true,
    showHeader: true,
    showFooter: true,
    children: (
      <div
        style={{
          padding: "2rem",
          background: "var(--color-primary-10)",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--border-radius-md)",
        }}
      >
        <h2>メインコンテンツエリア</h2>
      </div>
    ),
  },
};

export const WithoutSidebar: Story = {
  args: {
    showSidebar: false,
    showHeader: true,
    showFooter: true,
    children: (
      <div
        style={{
          padding: "2rem",
          background: "var(--color-primary-10)",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--border-radius-md)",
        }}
      >
        <h2>サイドバーなしのレイアウト</h2>
      </div>
    ),
  },
};

export const WithoutHeader: Story = {
  args: {
    showSidebar: true,
    showHeader: false,
    showFooter: true,
    children: (
      <div
        style={{
          padding: "2rem",
          background: "var(--color-primary-10)",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--border-radius-md)",
        }}
      >
        <h2>ヘッダーなしのレイアウト</h2>
      </div>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    showSidebar: true,
    showHeader: true,
    showFooter: false,
    children: (
      <div
        style={{
          padding: "2rem",
          background: "var(--color-primary-10)",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--border-radius-md)",
        }}
      >
        <h2>フッターなしのレイアウト</h2>
      </div>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    showSidebar: false,
    showHeader: false,
    showFooter: false,
    children: (
      <div
        style={{
          padding: "2rem",
          background: "var(--color-primary-10)",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--border-radius-md)",
        }}
      >
        <h2>コンテンツのみのレイアウト</h2>
      </div>
    ),
  },
};
