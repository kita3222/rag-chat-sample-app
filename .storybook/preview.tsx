import "../app/styles/global.css";
import { ReactNode } from "react";
import { StyleSheetManager } from "styled-components";
import type { Preview, StoryFn } from "@storybook/react";

const withThemeProvider = (Story: StoryFn) => {
  return (
    <StyleSheetManager
      enableVendorPrefixes
      shouldForwardProp={(prop) => prop !== "$isSelected"}
    >
      <Story />
    </StyleSheetManager>
  );
};

/** @type { import('@storybook/react').Preview } */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F9FAFB" },
        { name: "dark", value: "#1A1A1A" },
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: {},
    },
  },
  decorators: [withThemeProvider],
};

export default preview;
