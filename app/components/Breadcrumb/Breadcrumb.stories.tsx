import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb";
import Input from "../Input/Input";
import Button from "../Button/Button";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// 検索コンポーネント
const SearchComponent = () => (
  <div style={{ width: "300px" }}>
    <Input
      type="text"
      placeholder="検索..."
      value=""
      onChange={() => {}}
      inputSize={Input.SIZES.SMALL}
    />
  </div>
);

// 基本的なパンくずリスト
export const Basic: Story = {
  args: {
    items: [{ label: "管理", href: "/admin" }, { label: "ユーザー管理" }],
    title: "ユーザー管理",
  },
};

// 検索コンポーネント付きのパンくずリスト
export const WithSearch: Story = {
  args: {
    items: [{ label: "管理", href: "/admin" }, { label: "ユーザー管理" }],
    title: "ユーザー管理",
    actionComponents: <SearchComponent />,
  },
};

// ボタンと検索コンポーネント付きのパンくずリスト
export const WithMultipleComponents: Story = {
  args: {
    items: [{ label: "管理", href: "/admin" }, { label: "ユーザー管理" }],
    title: "ユーザー管理",
    actionComponents: (
      <>
        <Button variant={Button.VARIANTS.PRIMARY} size={Button.SIZES.SMALL}>
          新規作成
        </Button>
        <SearchComponent />
      </>
    ),
  },
};

// 多階層のパンくずリスト
export const MultiLevel: Story = {
  args: {
    items: [
      { label: "管理", href: "/admin" },
      { label: "設定", href: "/admin/settings" },
      { label: "ユーザー管理" },
    ],
    title: "ユーザーの編集",
  },
};
