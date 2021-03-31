import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes, CSSProperties } from 'react';
import { parse } from 'twemoji-parser';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    emoji: string;
    spritesheetIndex?: number;
}

const isWindows =
    typeof window !== 'undefined' && /win/i.test(navigator.platform);

const SPRITESHEET_COLUMNS = 42;
const SPRITESHEET_ROWS = 43;
const EMOJI_SIZE = 28;

export const AdaptiveEmoji = React.forwardRef<HTMLButtonElement, Props>(
    ({ emoji, spritesheetIndex, ...props }, ref) => {
        const shouldUseTwemoji = isWindows;

        let style: CSSProperties | undefined;
        const useSpritesheet = spritesheetIndex != null;

        if (shouldUseTwemoji) {
            if (spritesheetIndex != null) {
                const column = spritesheetIndex % SPRITESHEET_COLUMNS;
                const row = Math.floor(spritesheetIndex / SPRITESHEET_COLUMNS);

                const backgroundXPosition = column * EMOJI_SIZE;
                const backgroundYPosition = row * EMOJI_SIZE;

                style = {
                    backgroundPosition: `-${backgroundXPosition}px -${backgroundYPosition}px`,
                };
            } else {
                const [firstParsingResult] = parse(emoji);

                if (firstParsingResult) {
                    style = {
                        backgroundImage: `url(${firstParsingResult.url})`,
                    };
                }
            }
        }

        return (
            <EmojiContainer ref={ref} {...props}>
                <EmojiBackgroundImageContainer
                    style={style}
                    useSpritesheet={useSpritesheet}
                >
                    <NativeEmojiSpan visuallyHidden={shouldUseTwemoji}>
                        {emoji}
                    </NativeEmojiSpan>
                </EmojiBackgroundImageContainer>
            </EmojiContainer>
        );
    }
);

const EmojiContainer = styled.button`
    height: 100%;
    width: 100%;
    background-color: unset;
    margin: 0;
    padding: 4px;
    border-radius: 3px;

    &:focus {
        background-color: var(--chayns-color--002);
    }
`;

const EmojiBackgroundImageContainer = styled.span<{ useSpritesheet: boolean }>`
    display: block;
    height: 100%;

    ${(props) =>
        props.useSpritesheet
            ? css`
                  background-image: ${`url(${
                      // @ts-expect-error
                      __DEV__
                          ? '/twemoji-spritesheet.png'
                          : // @ts-ignore: This only has to be ignored in editors, it will get replaced before TSC ever sees the code.
                            `https://unpkg.com/chayns-emoji-picker@${__pkgVersion__}/spritesheets/twemoji-spritesheet.png`
                  })`};
                  background-repeat: no-repeat;
                  background-size: ${SPRITESHEET_COLUMNS * 100}%
                      ${SPRITESHEET_ROWS * 100}%;
              `
            : ''}
`;

const NativeEmojiSpan = styled.span<{ visuallyHidden: boolean }>`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: ${(props) => (props.visuallyHidden ? 'transparent' : 'inherit')};
`;
