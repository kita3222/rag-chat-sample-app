import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import StatusBadge, { DocumentStatus } from "./StatusBadge";

// ストーリーのメタデータ
const meta: Meta<typeof StatusBadge> = {
  title: "Admin/KnowledgeBase/Components/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ドキュメントや他のエンティティのステータスを表示するためのバッジコンポーネントです。状態に応じた色分けが適用されます。",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "processing", "error", "inactive"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

// 各ステータスのストーリー
export const Active: Story = {
  args: {
    status: "active",
  },
};

export const Processing: Story = {
  args: {
    status: "processing",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};

export const Inactive: Story = {
  args: {
    status: "inactive",
  },
};

// カスタムテキストを使用するストーリー
export const CustomText: Story = {
  args: {
    status: "active",
    children: "カスタムテキスト",
  },
};

// 全てのステータスをまとめて表示するストーリー
export const AllStatuses: Story = {
  render: () => {
    const statuses: DocumentStatus[] = [
      "active",
      "processing",
      "error",
      "inactive",
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {statuses.map((status) => (
          <div
            key={status}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <StatusBadge status={status} />
            <span
              style={{ fontSize: "0.875rem", color: "var(--color-gray-700)" }}
            >
              ステータス: {status}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
