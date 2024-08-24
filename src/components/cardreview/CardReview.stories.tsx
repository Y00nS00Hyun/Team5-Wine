import type { Meta, StoryObj } from '@storybook/react';
import CardReview from './CardReview';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/CardReview',
  component: CardReview,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs', 'CardReview'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CardReview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const MyCardReview: Story = {
  args: {
    wineName: '와인 이름입니다.',
    reviewId: 1,
    handleIsChanged: () => undefined,
  },
};
