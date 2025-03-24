import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
  title: "Components/Core/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "入力フィールドのラベル",
    },
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    error: {
      control: "text",
      description: "エラーテキスト",
    },
    required: {
      control: "boolean",
      description: "必須入力かどうか",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "入力タイプ",
    },
    value: {
      control: "text",
      description: "入力値",
    },
    onChange: { action: "changed" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "ユーザー名",
    placeholder: "ユーザー名を入力してください",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "メールアドレス",
    placeholder: "example@email.com",
    type: "email",
  },
};

export const WithError: Story = {
  args: {
    label: "パスワード",
    placeholder: "パスワードを入力",
    error: "パスワードは8文字以上必要です",
    type: "password",
  },
};

export const Required: Story = {
  args: {
    label: "氏名",
    placeholder: "山田 太郎",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "編集不可フィールド",
    value: "この値は変更できません",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: "コメント",
    placeholder: "コメントを入力してください",
    className: "w-full",
  },
  parameters: {
    layout: "padded",
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}
    >
      <Input label="標準入力" placeholder="テキストを入力" />

      <Input label="必須入力" placeholder="必須フィールド" required />

      <Input label="ヘルパーテキスト付き" placeholder="入力してください" />

      <Input
        label="エラー状態"
        value="無効な入力"
        error="このフィールドは無効です"
      />

      <Input label="無効状態" value="編集不可" disabled />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}
    >
      <Input label="テキスト入力" placeholder="標準テキスト" type="text" />

      <Input
        label="メールアドレス"
        placeholder="example@email.com"
        type="email"
      />

      <Input
        label="パスワード"
        placeholder="パスワードを入力"
        type="password"
      />

      <Input label="数値" placeholder="0" type="number" />

      <Input label="電話番号" placeholder="090-1234-5678" type="tel" />

      <Input label="URL" placeholder="https://example.com" type="url" />
    </div>
  ),
};
