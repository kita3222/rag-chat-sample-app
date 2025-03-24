import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import LoginPage from "./page";

// LoginPageストーリー用のモック付きコンポーネントを作成
const LoginPageWithMocks = () => <LoginPage />;

const meta: Meta<typeof LoginPageWithMocks> = {
  title: "Pages/Login",
  component: LoginPageWithMocks,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/auth/login",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginPageWithMocks>;

export const Default: Story = {
  render: () => <LoginPageWithMocks />,
};
