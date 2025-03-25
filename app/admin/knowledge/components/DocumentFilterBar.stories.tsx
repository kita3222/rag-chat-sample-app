import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DocumentFilterBar from "./DocumentFilterBar";

// ストーリーのメタデータ
const meta: Meta<typeof DocumentFilterBar> = {
  title: "Admin/KnowledgeBase/Components/DocumentFilterBar",
  component: DocumentFilterBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ナレッジベースのドキュメントをフィルタリングするためのコンポーネントです。ドキュメントのタイプとステータスに基づいてフィルタリングできます。",
      },
    },
  },
  argTypes: {
    onTypeChange: { action: "type changed" },
    onStatusChange: { action: "status changed" },
  },
};

export default meta;

type Story = StoryObj<typeof DocumentFilterBar>;

// デフォルトストーリー
export const Default: Story = {
  args: {
    selectedType: "all",
    selectedStatus: "all",
    onTypeChange: action("onTypeChange"),
    onStatusChange: action("onStatusChange"),
  },
};

// タイプフィルター選択時
export const TypeSelected: Story = {
  args: {
    selectedType: "pdf",
    selectedStatus: "all",
    onTypeChange: action("onTypeChange"),
    onStatusChange: action("onStatusChange"),
  },
};

// ステータスフィルター選択時
export const StatusSelected: Story = {
  args: {
    selectedType: "all",
    selectedStatus: "active",
    onTypeChange: action("onTypeChange"),
    onStatusChange: action("onStatusChange"),
  },
};

// 両方のフィルター選択時
export const BothSelected: Story = {
  args: {
    selectedType: "pdf",
    selectedStatus: "active",
    onTypeChange: action("onTypeChange"),
    onStatusChange: action("onStatusChange"),
  },
};

// インタラクティブなデモ
export const Interactive: Story = {
  render: function Render() {
    const [selectedType, setSelectedType] = useState<
      "all" | "pdf" | "text" | "webpage" | "faq"
    >("all");
    const [selectedStatus, setSelectedStatus] = useState<
      "all" | "active" | "processing" | "error" | "inactive"
    >("all");

    return (
      <div>
        <h3>選択中のフィルター:</h3>
        <p>
          タイプ: <strong>{selectedType}</strong>
        </p>
        <p>
          ステータス: <strong>{selectedStatus}</strong>
        </p>
        <hr style={{ margin: "1rem 0" }} />
        <DocumentFilterBar
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onTypeChange={(type) => {
            setSelectedType(type);
            action("onTypeChange")(type);
          }}
          onStatusChange={(status) => {
            setSelectedStatus(status);
            action("onStatusChange")(status);
          }}
        />
      </div>
    );
  },
};
