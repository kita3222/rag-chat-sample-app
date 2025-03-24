import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Core/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.values(Button.VARIANTS),
      description: "ボタンのバリアント（見た目のスタイル）",
    },
    size: {
      control: { type: "select" },
      options: Object.values(Button.SIZES),
      description: "ボタンのサイズ",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    isLoading: {
      control: "boolean",
      description: "読み込み中の状態",
    },
    fullWidth: {
      control: "boolean",
      description: "親要素の幅いっぱいに広がるかどうか",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "プライマリーボタン",
    variant: Button.VARIANTS.PRIMARY,
    size: Button.SIZES.MEDIUM,
  },
};

export const Secondary: Story = {
  args: {
    children: "セカンダリーボタン",
    variant: Button.VARIANTS.SECONDARY,
    size: Button.SIZES.MEDIUM,
  },
};

export const Text: Story = {
  args: {
    children: "テキストボタン",
    variant: Button.VARIANTS.TEXT,
    size: Button.SIZES.MEDIUM,
  },
};

export const Danger: Story = {
  args: {
    children: "削除する",
    variant: Button.VARIANTS.DANGER,
    size: Button.SIZES.MEDIUM,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size={Button.SIZES.SMALL}>小</Button>
      <Button size={Button.SIZES.MEDIUM}>中</Button>
      <Button size={Button.SIZES.LARGE}>大</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => {
    // 簡易的なアイコンコンポーネント
    const Icon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        <Button icon={<Icon />}>アイコン左</Button>
        <Button icon={<Icon />} iconPosition="right">
          アイコン右
        </Button>
        <Button icon={<Icon />} variant={Button.VARIANTS.SECONDARY}>
          セカンダリー
        </Button>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button>通常</Button>
        <Button disabled>無効</Button>
        <Button isLoading>読み込み中</Button>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button variant={Button.VARIANTS.SECONDARY}>通常</Button>
        <Button variant={Button.VARIANTS.SECONDARY} disabled>
          無効
        </Button>
        <Button variant={Button.VARIANTS.SECONDARY} isLoading>
          読み込み中
        </Button>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: "全幅ボタン",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};
