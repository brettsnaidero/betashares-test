import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "@/components/Header";
import { mockFetch } from "@/test/mock-fetch";
import Home from "./page";

const meta = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <>
        <Header />
        <Story />
      </>
    ),
  ],
  beforeEach: () =>
    mockFetch({
      response: { results: [], count: 0, indexed_at: Date.now() },
      delay: 0,
    }),
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
