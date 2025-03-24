import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ThemeToggle from "./ThemeToggle";

const meta = {
  title: "Components/Core/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isDarkMode: {
      control: "boolean",
      description: "ダークモードかどうか",
    },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const LightMode: Story = {
  args: {
    isDarkMode: false,
  },
};

export const DarkMode: Story = {
  args: {
    isDarkMode: true,
  },
};

export const Interactive: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const InteractiveThemeToggle = () => {
      const [isDarkMode, setIsDarkMode] = React.useState(false);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "24px",
            backgroundColor: isDarkMode ? "#1A1A1A" : "#F9FAFB",
            color: isDarkMode ? "#F9FAFB" : "#1A1A1A",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
        >
          <p>現在のテーマ: {isDarkMode ? "ダークモード" : "ライトモード"}</p>
          <ThemeToggle
            isDarkMode={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <p style={{ fontSize: "14px" }}>クリックして切り替えてみてください</p>
        </div>
      );
    };

    return <InteractiveThemeToggle />;
  },
};
