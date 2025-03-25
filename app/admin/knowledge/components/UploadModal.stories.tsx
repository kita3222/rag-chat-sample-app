import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import UploadModal from "./UploadModal";

// ストーリーのメタデータ
const meta: Meta<typeof UploadModal> = {
  title: "Admin/KnowledgeBase/Components/UploadModal",
  component: UploadModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ナレッジベースに新しいドキュメントをアップロードするためのモーダルコンポーネントです。ドラッグ＆ドロップによるファイルアップロードをサポートしています。",
      },
    },
  },
  argTypes: {
    onClose: { action: "closed" },
    onUpload: { action: "uploaded" },
  },
};

export default meta;

type Story = StoryObj<typeof UploadModal>;

// デフォルトストーリー（モーダルを開いた状態）
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: action("onClose"),
    onUpload: action("onUpload"),
  },
};

// モーダルを閉じた状態
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action("onClose"),
    onUpload: action("onUpload"),
  },
};

// デモ用の状態変化を示すストーリー
export const InteractiveDemo: Story = {
  render: () => {
    // このデモでは実際のインタラクションを示すことができる
    // 実際のStorybook環境では、ユーザーがドラッグ＆ドロップ操作を
    // 行うことができます
    return (
      <UploadModal
        isOpen={true}
        onClose={action("onClose")}
        onUpload={(data) => {
          action("onUpload")(data);
          alert(`ファイル "${data.title}" がアップロードされました`);
        }}
      />
    );
  },
};
