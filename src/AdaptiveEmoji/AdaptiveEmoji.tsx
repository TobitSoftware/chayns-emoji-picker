import styled from '@emotion/styled';
import React, { CSSProperties, ReactElement } from 'react';

interface Props {
    emoji: string;
    index: number;
}

const isWindows =
    typeof window !== 'undefined' && /win/i.test(navigator.platform);

const SPRITESHEET_COLUMNS = 42;
const SPRITESHEET_ROWS = 43;
const EMOJI_SIZE = 28;

export function AdaptiveEmoji({ emoji, index }: Props): ReactElement {
    const shouldUseTwemoji = isWindows;

    let style: CSSProperties | undefined;

    if (shouldUseTwemoji) {
        const column = index % SPRITESHEET_COLUMNS;
        const row = Math.floor(index / SPRITESHEET_COLUMNS);

        const backgroundXPosition = column * EMOJI_SIZE;
        const backgroundYPosition = row * EMOJI_SIZE;

        style = {
            backgroundPosition: `-${backgroundXPosition}px -${backgroundYPosition}px`,
        };
    }

    return (
        <EmojiContainer className="emoji" style={style}>
            <NativeEmojiSpan visuallyHidden={shouldUseTwemoji}>
                {emoji}
            </NativeEmojiSpan>
        </EmojiContainer>
    );
}

const EmojiContainer = styled.div`
    height: 100%;

    background-image: url(https://awesome-swartz-cfc28f.netlify.app/twemoji-spritesheet.png);
    background-repeat: no-repeat;
    background-size: ${SPRITESHEET_COLUMNS * 100}% ${SPRITESHEET_ROWS * 100}%;
`;

const NativeEmojiSpan = styled.span<{ visuallyHidden: boolean }>`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: ${(props) => (props.visuallyHidden ? 'transparent' : 'inherit')};
`;
