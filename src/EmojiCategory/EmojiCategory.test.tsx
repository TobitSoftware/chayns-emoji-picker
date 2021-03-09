import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { emojiCategories } from '../german-emoji-data';
import { EmojiCategory } from './EmojiCategory';

test('should toggle list visibility on click', async () => {
    const category = emojiCategories[0];

    const { queryByRole, getByRole } = render(
        <EmojiCategory category={category.category} emojis={category.emojis} />
    );

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
        expect(queryByRole('list')).not.toBeInTheDocument();
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
        expect(getByRole('list')).toBeInTheDocument();
    });
});
