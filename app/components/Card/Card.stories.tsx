import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
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
      options: Object.values(Card.VARIANTS),
      description: "カードのバリアント（見た目のスタイル）",
    },
    selected: {
      control: "boolean",
      description: "選択状態",
    },
    selectable: {
      control: "boolean",
      description: "選択可能かどうか",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Card.Title>カードタイトル</Card.Title>
        <Card.Subtitle>カードサブタイトル</Card.Subtitle>
        <Card.Content>
          <p>
            ここにカードのコンテンツが入ります。テキスト、画像、リスト、その他の要素を含めることができます。
          </p>
        </Card.Content>
      </>
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
      <Card variant={Card.VARIANTS.DEFAULT} style={{ width: "220px" }}>
        <Card.Title>デフォルト</Card.Title>
        <Card.Content>基本的なカードスタイル</Card.Content>
      </Card>

      <Card variant={Card.VARIANTS.ELEVATED} style={{ width: "220px" }}>
        <Card.Title>エレベーテッド</Card.Title>
        <Card.Content>浮き上がったカードスタイル</Card.Content>
      </Card>

      <Card variant={Card.VARIANTS.OUTLINED} style={{ width: "220px" }}>
        <Card.Title>アウトライン</Card.Title>
        <Card.Content>枠線のあるカードスタイル</Card.Content>
      </Card>

      <Card variant={Card.VARIANTS.INTERACTIVE} style={{ width: "220px" }}>
        <Card.Title>インタラクティブ</Card.Title>
        <Card.Content>ホバー効果のあるカードスタイル</Card.Content>
      </Card>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card style={{ width: "350px" }}>
      <Card.Title>アクション付きカード</Card.Title>
      <Card.Content>
        <p>カードには上部や下部のアクション領域を追加できます。</p>
      </Card.Content>
      <Card.Actions>
        <Button variant={Button.VARIANTS.TEXT}>キャンセル</Button>
        <Button>保存</Button>
      </Card.Actions>
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
              selectable
              selected={selectedCard === id}
              onClick={() => setSelectedCard(id)}
              style={{ width: "220px" }}
            >
              <Card.Title>選択可能カード {id}</Card.Title>
              <Card.Content>
                <p>このカードは選択可能です。クリックしてみてください。</p>
              </Card.Content>
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
    <Card style={{ width: "400px" }}>
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
        }}
      >
        イメージエリア
      </div>
      <Card.Title>多彩なコンテンツ</Card.Title>
      <Card.Subtitle>様々なコンテンツを表示可能</Card.Subtitle>
      <Card.Content>
        <p>カードは様々なコンテンツを格納できる柔軟なコンポーネントです。</p>
        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li>テキストコンテンツ</li>
          <li>画像や動画</li>
          <li>リストや表</li>
          <li>フォームエレメント</li>
        </ul>
      </Card.Content>
      <Card.Actions>
        <Button variant={Button.VARIANTS.TEXT}>詳細を見る</Button>
        <Button>アクション</Button>
      </Card.Actions>
    </Card>
  ),
};
