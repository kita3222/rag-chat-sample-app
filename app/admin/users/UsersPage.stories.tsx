import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import UsersPageStory from "./UsersPageStory";

const meta: Meta<typeof UsersPageStory> = {
  title: "Pages/Admin/UsersPage",
  component: UsersPageStory,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof UsersPageStory>;

export const Default: Story = {
  render: () => <UsersPageStory />,
};
