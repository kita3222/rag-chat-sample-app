import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card, { VARIANTS } from "./Card";
import Button from "../Button/Button";

const meta = {
  title: "Components/Core/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.values(VARIANTS),
      description: "カードのバリアント（見た目のスタイル）",
    },
    selected: {
      control: "boolean",
      description: "選択状態",
    },
    title: {
      control: "text",
      description: "カードのタイトル",
    },
    subtitle: {
      control: "text",
      description: "カードのサブタイトル",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "カードタイトル",
    subtitle: "カードサブタイトル",
    children: (
      <p>
        ここにカードのコンテンツが入ります。テキスト、画像、リスト、その他の要素を含めることができます。
      </p>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        maxWidth: "800px",
      }}
    >
      <Card
        variant={VARIANTS.DEFAULT}
        style={{ width: "220px" }}
        title="デフォルト"
      >
        基本的なカードスタイル
      </Card>

      <Card
        variant={VARIANTS.ELEVATED}
        style={{ width: "220px" }}
        title="エレベーテッド"
      >
        浮き上がったカードスタイル
      </Card>

      <Card
        variant={VARIANTS.OUTLINED}
        style={{ width: "220px" }}
        title="アウトライン"
      >
        枠線のあるカードスタイル
      </Card>

      <Card
        variant={VARIANTS.INTERACTIVE}
        style={{ width: "220px" }}
        title="インタラクティブ"
      >
        ホバー効果のあるカードスタイル
      </Card>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card
      style={{ width: "350px" }}
      title="アクション付きカード"
      footer={
        <>
          <Button variant={Button.VARIANTS.TEXT}>キャンセル</Button>
          <Button>保存</Button>
        </>
      }
    >
      <p>カードには上部や下部のアクション領域を追加できます。</p>
    </Card>
  ),
};

export const Selectable: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const SelectableCards = () => {
      const [selectedCard, setSelectedCard] = React.useState<number | null>(
        null
      );

      return (
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            maxWidth: "800px",
          }}
        >
          {[1, 2, 3, 4].map((id) => (
            <Card
              key={id}
              selected={selectedCard === id}
              onClick={() => setSelectedCard(id)}
              style={{ width: "220px" }}
              title={`選択可能カード ${id}`}
            >
              <p>このカードは選択可能です。クリックしてみてください。</p>
            </Card>
          ))}
        </div>
      );
    };

    return <SelectableCards />;
  },
};

export const RichContent: Story = {
  render: () => (
    <Card
      style={{ width: "400px" }}
      title="多彩なコンテンツ"
      subtitle="様々なコンテンツを表示可能"
      footer={
        <>
          <Button variant={Button.VARIANTS.TEXT}>詳細を見る</Button>
          <Button>アクション</Button>
        </>
      }
    >
      <div
        style={{
          height: "180px",
          backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        イメージエリア
      </div>
      <p>カードは様々なコンテンツを格納できる柔軟なコンポーネントです。</p>
      <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
        <li>テキストコンテンツ</li>
        <li>画像や動画</li>
        <li>リストや表</li>
        <li>フォームエレメント</li>
      </ul>
    </Card>
  ),
};
