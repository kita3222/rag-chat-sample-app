import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import AppHeader from "./AppHeader";
import { MockAuthProvider } from "../../auth/MockAuthProvider";

const meta: Meta<typeof AppHeader> = {
  title: "Components/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const NotLoggedIn: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          margin: "-1rem",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <MockAuthProvider
      authState={{
        user: null,
        loading: false,
        error: null,
      }}
    >
      <AppHeader />
    </MockAuthProvider>
  ),
};

export const LoggedInAsUser: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          margin: "-1rem",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Story />
      </div>
    ),
  ],
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
      <AppHeader />
    </MockAuthProvider>
  ),
};

export const LoggedInAsAdmin: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          margin: "-1rem",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <MockAuthProvider
      authState={{
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        },
        loading: false,
        error: null,
      }}
    >
      <AppHeader />
    </MockAuthProvider>
  ),
};
