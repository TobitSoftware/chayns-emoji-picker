import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { EmojiPicker } from './EmojiPicker';

export default {
    title: 'EmojiPicker',
    component: EmojiPicker,
} as Meta;

const Template: Story = (args) => <EmojiPicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
