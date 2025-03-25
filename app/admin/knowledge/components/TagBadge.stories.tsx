import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TagBadge, { TagList } from "./TagBadge";

// ストーリーのメタデータ
const meta: Meta<typeof TagBadge> = {
  title: "Admin/KnowledgeBase/Components/TagBadge",
  component: TagBadge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ドキュメントやその他のエンティティのタグを表示するためのバッジコンポーネントです。",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof TagBadge>;

// 基本的なタグ
export const Default: Story = {
  args: {
    children: "製品",
  },
};

// クリック可能なタグ
export const Clickable: Story = {
  args: {
    children: "クリック可能",
    onClick: action("onClick"),
  },
};

// タグリストの例
export const TagListExample: Story = {
  render: () => {
    const tags = ["製品", "マニュアル", "利用ガイド", "FAQ", "サポート"];

    return (
      <div>
        <h3 style={{ marginBottom: "1rem" }}>単一タグ:</h3>
        <TagBadge>単一タグ</TagBadge>

        <h3 style={{ margin: "1rem 0" }}>タグリスト:</h3>
        <TagList>
          {tags.map((tag, index) => (
            <TagBadge key={index}>{tag}</TagBadge>
          ))}
        </TagList>

        <h3 style={{ margin: "1rem 0" }}>クリック可能なタグリスト:</h3>
        <TagList>
          {tags.map((tag, index) => (
            <TagBadge key={index} onClick={() => action("tagClicked")(tag)}>
              {tag}
            </TagBadge>
          ))}
        </TagList>

        <h3 style={{ margin: "1rem 0" }}>オーバーフロー表示:</h3>
        <div
          style={{
            width: "200px",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <TagList>
            {tags.slice(0, 2).map((tag, index) => (
              <TagBadge key={index}>{tag}</TagBadge>
            ))}
            {tags.length > 2 && <TagBadge>+{tags.length - 2}</TagBadge>}
          </TagList>
        </div>
      </div>
    );
  },
};
