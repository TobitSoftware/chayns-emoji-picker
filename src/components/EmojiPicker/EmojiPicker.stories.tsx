import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useRef } from 'react';
import { EmojiPicker, EmojiPickerProps } from './EmojiPicker';

export default {
    title: 'EmojiPicker',
    component: EmojiPicker,
} as Meta;

const Template: Story<EmojiPickerProps> = (args) => <EmojiPicker {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithAnchor: Story<EmojiPickerProps> = (args) => (
    <AnchorComponent {...args} />
);
WithAnchor.args = {
    show: true,
    horizontal: 'left',
    vertical: 'top',
};

function AnchorComponent(props: EmojiPickerProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <div
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'palegoldenrod',
                        borderRadius: 3,
                        resize: 'both',
                        overflow: 'hidden',
                    }}
                    ref={ref}
                ></div>
            </div>
            <EmojiPicker {...props} anchor={ref} />
        </>
    );
}
