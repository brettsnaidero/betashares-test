import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "mediumSmall", "large"],
    },
    padding: {
      control: "select",
      options: ["compact", "standard", "spacious", "none"],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Variants */
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary Button",
    variant: "tertiary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: "Disabled Secondary",
    variant: "secondary",
    disabled: true,
  },
};

/* Sizes */
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "medium",
  },
};

export const MediumSmall: Story = {
  args: {
    children: "Medium Button",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "large",
  },
};

/* Padding */
export const CompactPadding: Story = {
  args: {
    children: "Compact Padding",
    padding: "compact",
  },
};

export const StandardPadding: Story = {
  args: {
    children: "Standard Padding",
    padding: "standard",
  },
};

export const SpaciousPadding: Story = {
  args: {
    children: "Spacious Padding",
    padding: "spacious",
  },
};

export const NoPadding: Story = {
  args: {
    variant: "tertiary",
    children: "No Padding",
    padding: "none",
  },
};
