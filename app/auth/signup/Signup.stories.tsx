import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import SignupPage from "./page";
import { MockAuthProvider } from "../MockAuthProvider";

const meta: Meta<typeof SignupPage> = {
  title: "Pages/Auth/Signup",
  component: SignupPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SignupPage>;

export const Default: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: false,
        error: null,
      }}
    >
      <SignupPage />
    </MockAuthProvider>
  ),
};

export const WithError: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: false,
        error: "このメールアドレスは既に使用されています。",
      }}
    >
      <SignupPage />
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
      <SignupPage />
    </MockAuthProvider>
  ),
};
