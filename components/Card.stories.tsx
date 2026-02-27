import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a sample card component with a title and description.',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Card with Long Content',
    description:
      'This card has a much longer description to demonstrate how the component handles longer text content. It should wrap properly and maintain good readability.',
  },
};

export const ShortContent: Story = {
  args: {
    title: 'Short',
    description: 'Brief.',
  },
};
