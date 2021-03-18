import styled from '@emotion/styled';
import React, { KeyboardEvent, ReactElement, useRef, useState } from 'react';
import { EmojiData } from '../german-emoji-data';
import { AdaptiveEmoji } from './AdaptiveEmoji';
import SkinTonePicker from './SkinTonePicker';

const ROW_SIZE = 8;

interface Props {
    emojiData: EmojiData;
    index: number;
    onSelect: () => void;
    rowIndex: number;
    columnIndex: number;
}

export function GridCell({
    emojiData,
    index,
    onSelect,
    rowIndex,
    columnIndex,
}: Props): ReactElement {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [emoji, , , modifiers] = emojiData;

    const [showSkinTonePicker, setShowSkinTonePicker] = useState(false);

    const skinToneModifiable = modifiers?.includes('s');

    function handleClick() {
        if (skinToneModifiable) {
            setShowSkinTonePicker((current) => !current);
        } else {
            onSelect();
        }
    }

    function selectAdjacentGridCell(rowDiff: number, columnDiff: number) {
        let newRow = rowIndex + rowDiff;
        let newColumn = columnIndex + columnDiff;

        if (newColumn < 0) {
            newRow--;
            newColumn = ROW_SIZE - 1;
        } else if (newColumn >= ROW_SIZE) {
            newRow++;
            newColumn = 0;
        }

        const classSelector = '.emoji-picker__grid-cell';
        const rowIndexSelector = `[aria-rowindex="${newRow}"]`;
        const colIndexSelector = `[aria-colindex="${newColumn}"]`;

        const element = document.querySelector(
            classSelector + rowIndexSelector + colIndexSelector + ' > button'
        );

        // @ts-expect-error
        if (element && element.focus) {
            // @ts-expect-error
            element.focus();
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
        switch (event.key) {
            case 'ArrowUp':
                selectAdjacentGridCell(-1, 0);
                event.preventDefault();
                break;
            case 'ArrowRight':
                selectAdjacentGridCell(0, 1);
                break;
            case 'ArrowDown':
                selectAdjacentGridCell(1, 0);
                event.preventDefault();
                break;
            case 'ArrowLeft':
                selectAdjacentGridCell(0, -1);
                break;
        }
    }

    const emojiButtonId = `emoji-button-${emojiData}`;

    return (
        <Emoji
            className="emoji-picker__grid-cell"
            role="gridcell"
            aria-rowindex={rowIndex}
            aria-colindex={columnIndex}
            onKeyDown={handleKeyDown}
        >
            <AdaptiveEmoji
                emoji={emoji}
                spritesheetIndex={index}
                onClick={handleClick}
                aria-haspopup={skinToneModifiable}
                aria-expanded={showSkinTonePicker}
                id={emojiButtonId}
                ref={buttonRef}
            />
            {showSkinTonePicker && (
                <SkinTonePicker
                    emoji={emoji}
                    finalFocusRef={buttonRef}
                    onClose={() => setShowSkinTonePicker(false)}
                    onSelect={() => setShowSkinTonePicker(false)}
                    parentId={emojiButtonId}
                />
            )}
        </Emoji>
    );
}

const Emoji = styled.li`
    position: relative;
    width: 36px;
    height: 36px;
    margin: 0;
    list-style-type: none;
`;
