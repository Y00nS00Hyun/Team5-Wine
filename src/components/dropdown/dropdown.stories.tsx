import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Dropdown from '../../components/dropdown/DropDown';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Dropdown',
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs', 'dropdown'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const MyDropdown: Story = {
  args: {
    items: [
      { name: '마이페이지', path: '/myprofile' },
      { name: '로그아웃', path: '/' },
      { name: '안뇽하삽니까', path: '' },
      { name: '똑똑히 봤슈', path: '' },
    ],
  },
};

export const 테스트_드롭다운: Story = {
  args: {
    items: [
      { name: 'ㅋㅋㅋㅋㅋ', path: '/myprofile' },
      { name: '똑똑히 봤슈', path: '' },
    ],
  },
};

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
