import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card from "../app/components/Card";
import Button from "../app/components/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.values(Card.VARIANTS),
      description: "カードのバリアント（見た目のスタイル）",
    },
    title: {
      control: "text",
      description: "カードのタイトル",
    },
    subtitle: {
      control: "text",
      description: "カードのサブタイトル",
    },
    selected: {
      control: "boolean",
      description: "選択状態",
    },
    headerActions: {
      description: "ヘッダー部分の右側に表示するアクション要素",
    },
    footer: {
      description: "フッター部分に表示する要素",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 基本的なカード
export const Default: Story = {
  args: {
    title: "カードタイトル",
    subtitle: "カードのサブタイトル",
    children:
      "カードのコンテンツがここに表示されます。テキスト、画像、その他の要素を含めることができます。",
  },
};

// 様々なバリアント
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      <Card title="デフォルト" style={{ width: "250px" }}>
        基本的なカードスタイル
      </Card>
      <Card
        title="浮き上がり"
        variant={Card.VARIANTS.ELEVATED}
        style={{ width: "250px" }}
      >
        影が強調された浮き上がりスタイル
      </Card>
      <Card
        title="アウトライン"
        variant={Card.VARIANTS.OUTLINED}
        style={{ width: "250px" }}
      >
        枠線のみのシンプルなスタイル
      </Card>
      <Card
        title="インタラクティブ"
        variant={Card.VARIANTS.INTERACTIVE}
        style={{ width: "250px" }}
        onClick={() => console.log("Card clicked")}
      >
        ホバーやクリックで反応するスタイル
      </Card>
    </div>
  ),
};

// アクション付きカード
export const WithActions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Card
        title="ヘッダーアクション付き"
        subtitle="右側にアクションボタンがあります"
        headerActions={
          <Button variant={Button.VARIANTS.TEXT} size={Button.SIZES.SMALL}>
            詳細
          </Button>
        }
        style={{ width: "400px" }}
      >
        カードのコンテンツがここに表示されます。
      </Card>

      <Card
        title="フッターアクション付き"
        subtitle="下部にアクションボタンがあります"
        footer={
          <>
            <Button
              variant={Button.VARIANTS.SECONDARY}
              size={Button.SIZES.SMALL}
            >
              キャンセル
            </Button>
            <Button size={Button.SIZES.SMALL}>保存</Button>
          </>
        }
        style={{ width: "400px" }}
      >
        フォームや設定画面で使うのに適しています。
      </Card>
    </div>
  ),
};

// 選択可能なカード
export const Selectable: Story = {
  render: () => {
    const [selectedCard, setSelectedCard] = useState(1);

    return (
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {[1, 2, 3].map((id) => (
          <Card
            key={id}
            title={`選択可能なカード ${id}`}
            variant={Card.VARIANTS.INTERACTIVE}
            selected={selectedCard === id}
            onClick={() => setSelectedCard(id)}
            style={{ width: "200px" }}
          >
            クリックして選択できます
          </Card>
        ))}
      </div>
    );
  },
};

// リッチコンテンツを含むカード
export const RichContent: Story = {
  render: () => (
    <Card
      title="リッチコンテンツ"
      subtitle="様々な要素を組み合わせたカード"
      style={{ width: "400px" }}
      footer={<Button>アクション</Button>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          style={{
            height: "180px",
            backgroundColor: "var(--color-gray-200)",
            borderRadius: "var(--border-radius-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--space-2)",
          }}
        >
          <span>画像プレースホルダー</span>
        </div>
        <p>
          カードには様々なコンテンツ要素を含めることができます。
          テキスト、画像、リスト、アクションボタンなどを組み合わせて使用します。
        </p>
        <ul style={{ paddingLeft: "var(--space-4)" }}>
          <li>リストアイテム 1</li>
          <li>リストアイテム 2</li>
          <li>リストアイテム 3</li>
        </ul>
      </div>
    </Card>
  ),
};
