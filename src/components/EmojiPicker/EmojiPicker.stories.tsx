import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useRef } from 'react';
import { EmojiPicker, EmojiPickerProps } from './EmojiPicker';

export default {
    title: 'Demos/EmojiPicker',
    component: EmojiPicker,
} as Meta;

export const Relative: Story<EmojiPickerProps> = (args) => (
    <RelativeComponent {...args} />
);
Relative.args = {
    show: true,
    horizontal: 'left',
    vertical: 'top',
};

function RelativeComponent(props: EmojiPickerProps) {
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
                        position: 'relative',
                    }}
                >
                    <EmojiPicker {...props} />
                </div>
            </div>
        </>
    );
}

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
