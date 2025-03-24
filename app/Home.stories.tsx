import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Home from "./page";
import { MockAuthProvider } from "./auth/MockAuthProvider";

const meta: Meta<typeof Home> = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Default: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: false,
        error: null,
      }}
    >
      <Home />
    </MockAuthProvider>
  ),
};

export const LoggedIn: Story = {
  render: () => (
    <MockAuthProvider
      authState={{
        user: {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "user",
        },
        loading: false,
        error: null,
      }}
    >
      <Home />
    </MockAuthProvider>
  ),
};
