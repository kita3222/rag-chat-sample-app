import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import AppLayout from "./AppLayout";
import { MockAuthProvider } from "../../auth/MockAuthProvider";

const meta: Meta<typeof AppLayout> = {
  title: "Layouts/AppLayout",
  component: AppLayout,
  parameters: {
    layout: "fullscreen",
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
type Story = StoryObj<typeof AppLayout>;

export const NotLoggedIn: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-gray-100)",
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
      <AppLayout>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h1>サンプルコンテンツ</h1>
          <p>これはAppLayoutのサンプルコンテンツです。</p>
        </div>
      </AppLayout>
    </MockAuthProvider>
  ),
};

export const LoggedInAsUser: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-gray-100)",
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
      <AppLayout>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h1>サンプルコンテンツ</h1>
          <p>これはAppLayoutのサンプルコンテンツです。</p>
        </div>
      </AppLayout>
    </MockAuthProvider>
  ),
};

export const LoggedInAsAdmin: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-gray-100)",
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
      <AppLayout>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h1>サンプルコンテンツ</h1>
          <p>これはAppLayoutのサンプルコンテンツです。</p>
        </div>
      </AppLayout>
    </MockAuthProvider>
  ),
};
