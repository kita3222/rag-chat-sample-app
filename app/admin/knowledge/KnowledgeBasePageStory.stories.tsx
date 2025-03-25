import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import KnowledgeBasePageStory from "./KnowledgeBasePageStory";

// ストーリーのメタデータ
const meta: Meta<typeof KnowledgeBasePageStory> = {
  title: "Admin/KnowledgeBase/KnowledgeBasePageStory",
  component: KnowledgeBasePageStory,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "RAGで参照するドキュメントやFAQなどの管理画面です。ファイルのアップロード、検索、フィルタリングなどの機能を提供します。",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof KnowledgeBasePageStory>;

// デフォルトストーリー
export const Default: Story = {
  args: {},
};

// ローディング中のストーリー
export const Loading: Story = {
  args: {},
  render: () => {
    const LoadingComponent = () => {
      // KnowledgeBasePageStoryを継承してisLoadingだけをオーバーライド
      return <KnowledgeBasePageStory />;
    };

    // @ts-ignore - isLoadingステートを外部から設定するためのハック
    LoadingComponent.prototype.render = function () {
      const originalRender = KnowledgeBasePageStory.prototype.render;
      // @ts-ignore
      this.state = { ...this.state, isLoading: true };
      return originalRender.call(this);
    };

    return <LoadingComponent />;
  },
};

// 空のリストのストーリー
export const Empty: Story = {
  args: {},
  render: () => {
    const EmptyComponent = () => {
      // KnowledgeBasePageStoryを継承して空のドキュメントリストを使用
      return <KnowledgeBasePageStory />;
    };

    // @ts-ignore - 空のドキュメントリストを設定するためのハック
    EmptyComponent.prototype.render = function () {
      const originalRender = KnowledgeBasePageStory.prototype.render;
      // 元のコンポーネントの内部実装に依存する部分を上書き
      // @ts-ignore
      this.documents = [];
      return originalRender.call(this);
    };

    return <EmptyComponent />;
  },
};
