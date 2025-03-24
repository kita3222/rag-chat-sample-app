import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import SignupPage from "./page";

// SignupPageストーリー用のモック付きコンポーネントを作成
const SignupPageWithMocks = () => <SignupPage />;

const meta: Meta<typeof SignupPageWithMocks> = {
  title: "Pages/Signup",
  component: SignupPageWithMocks,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/auth/signup",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SignupPageWithMocks>;

export const Default: Story = {
  render: () => <SignupPageWithMocks />,
};
