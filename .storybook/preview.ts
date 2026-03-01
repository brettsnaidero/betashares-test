import type { Preview } from "@storybook/nextjs-vite";

import "../src/styles/reset.css";
import "../src/styles/fonts.css";
import "../src/styles/variables.css";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
