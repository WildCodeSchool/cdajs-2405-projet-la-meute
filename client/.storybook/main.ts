import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {
    return {
      ...config,
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
          "@style": path.resolve(__dirname, "../src/styles/global.scss"),
            },
      },
    };
  }
};
export default config;
