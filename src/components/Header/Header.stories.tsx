import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";
import { HeaderSkeleton } from "./HeaderSkeleton";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const WithSearchQuery: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        searchParams: { q: "NDQ" },
      },
    },
  },
};

export const Skeleton: StoryObj = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => <HeaderSkeleton />,
};
