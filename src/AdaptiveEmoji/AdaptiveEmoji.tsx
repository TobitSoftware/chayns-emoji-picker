import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { parse } from 'twemoji-parser';

interface Props {
    emoji: string;
}

const isWindows =
    typeof window !== 'undefined' && /win/i.test(navigator.platform);

export function AdaptiveEmoji({ emoji }: Props): ReactElement {
    const shouldUseTwemoji = isWindows;

    const style = shouldUseTwemoji
        ? { backgroundImage: `url(${parse(emoji)[0].url})` }
        : undefined;

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

    background-repeat: no-repeat;
`;

const NativeEmojiSpan = styled.span<{ visuallyHidden: boolean }>`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: ${(props) => (props.visuallyHidden ? 'transparent' : 'inherit')};
`;
