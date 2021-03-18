import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Popup } from './Popup';

export default {
    title: 'Popup',
    component: Popup,
} as Meta;

const Template: Story = (args) => <Popup {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
