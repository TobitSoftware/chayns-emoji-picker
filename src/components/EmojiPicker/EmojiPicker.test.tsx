import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { EmojiPicker } from './EmojiPicker';

test('should close when pressing ESC', () => {
    const hideFn = jest.fn();

    render(<EmojiPicker show onHide={hideFn} />);

    userEvent.keyboard('{esc}');

    expect(hideFn).toHaveBeenCalledTimes(1);
});

test('should call onPick when emoji is clicked', () => {
    const pickFn = jest.fn();

    const { getByText } = render(
        <EmojiPicker show onHide={() => {}} onPick={pickFn} />
    );

    userEvent.click(getByText('😃'));

    expect(pickFn).toHaveBeenCalledWith('😃');
});
