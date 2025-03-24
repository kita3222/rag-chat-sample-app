import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import LoginPage from "./page";
import { MockAuthProvider } from "../MockAuthProvider";

const meta: Meta<typeof LoginPage> = {
  title: "Pages/Auth/Login",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: false,
        error: null,
      }}
    >
      <LoginPage />
    </MockAuthProvider>
  ),
};

export const WithError: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: false,
        error: "メールアドレスまたはパスワードが正しくありません。",
      }}
    >
      <LoginPage />
    </MockAuthProvider>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: true,
        error: null,
      }}
    >
      <LoginPage />
    </MockAuthProvider>
  ),
};
