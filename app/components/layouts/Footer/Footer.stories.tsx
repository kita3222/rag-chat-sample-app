import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Layouts/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    companyName: { control: "text" },
    showVersion: { control: "boolean" },
    version: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    companyName: "Almondo Inc.",
    showVersion: true,
    version: "1.0.0",
  },
};

export const WithoutVersion: Story = {
  args: {
    companyName: "Almondo Inc.",
    showVersion: false,
  },
};

export const CustomCompany: Story = {
  args: {
    companyName: "カスタム企業名",
    showVersion: true,
    version: "2.3.5",
  },
};

export const Mobile: Story = {
  args: {
    companyName: "Almondo Inc.",
    showVersion: true,
    version: "1.0.0",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
