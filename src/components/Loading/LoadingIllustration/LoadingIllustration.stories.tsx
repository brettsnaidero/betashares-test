import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoadingIllustration } from "./LoadingIllustration";

const meta = {
  title: "Components/Loading/LoadingIllustration",
  component: LoadingIllustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 80,
  },
};
