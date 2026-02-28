import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BetasharesLogo } from "./BetasharesLogo";

const meta = {
  title: "Components/BetasharesLogo",
  component: BetasharesLogo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BetasharesLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
