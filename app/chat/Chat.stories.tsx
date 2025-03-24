import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import ChatPageStory from "./ChatPageStory";

const meta: Meta<typeof ChatPageStory> = {
  title: "Pages/Chat",
  component: ChatPageStory,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ChatPageStory>;

export const Default: Story = {
  render: () => <ChatPageStory />,
};
