import type { Preview } from "@storybook/react-vite";
import React from "react";
import "../src/styles/globals.css";
import { TooltipProvider } from "../src/components/tooltip";

const preview: Preview = {
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: ["Introduction", "Foundations", "Components"],
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div style={{ fontFamily: "var(--font-sans)" }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default preview;
