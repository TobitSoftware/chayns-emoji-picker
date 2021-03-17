import styled from '@emotion/styled';
import { useFocusWithin } from '@react-aria/interactions';
import React, { KeyboardEvent, ReactElement, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { AdaptiveEmoji } from './AdaptiveEmoji/AdaptiveEmoji';
import { EmojiData } from './german-emoji-data';
import { modifySkinTone } from './modifySkinTone';

interface Props {
    data: EmojiData;
    index: number;
    onSelect: () => void;
}

export function EmojiButton({ data, index, onSelect }: Props): ReactElement {
    const popupRef = useRef<HTMLUListElement | null>(null);
    const [refs] = useState(() =>
        Array.from(Array(6), () => React.createRef<HTMLButtonElement>())
    );

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [emoji, , , modifiers] = data;

    const [showSkinTonePicker, setShowSkinTonePicker] = useState(false);

    const skinToneModifiable = modifiers?.includes('s');

    function handleClick() {
        if (skinToneModifiable) {
            setShowSkinTonePicker((current) => !current);
        } else {
            onSelect();
        }
    }

    function handleSkinToneClick() {
        setShowSkinTonePicker(false);
    }

    const { focusWithinProps } = useFocusWithin({
        onBlurWithin() {
            setShowSkinTonePicker(false);
        },
    });

    function focusPrevious() {
        const currentFocusIndex = refs.findIndex(
            (ref) => ref.current === document.activeElement
        );

        const newIndex = modulo(currentFocusIndex - 1, refs.length);

        refs[newIndex].current?.focus();
    }

    function focusNext() {
        const currentFocusIndex = refs.findIndex(
            (ref) => ref.current === document.activeElement
        );

        const newIndex = modulo(currentFocusIndex + 1, refs.length);

        refs[newIndex].current?.focus();
    }

    function handleKeyDownPopup(event: KeyboardEvent<HTMLUListElement>) {
        switch (event.key) {
            case 'Escape':
                setShowSkinTonePicker(false);
                break;
            case 'ArrowUp':
                event.preventDefault();
                focusPrevious();
                break;
            case 'ArrowRight':
                focusNext();
                break;
            case 'ArrowDown':
                event.preventDefault();
                focusNext();
                break;
            case 'ArrowLeft':
                focusPrevious();
                break;
        }
    }

    const emojiButtonId = `emoji-button-${emoji}`;

    return (
        <Emoji>
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
                <FocusLock
                    onDeactivation={() => {
                        setTimeout(() => {
                            buttonRef.current?.focus();
                        }, 0);
                    }}
                >
                    <SkinTonePopup
                        ref={popupRef}
                        onKeyDown={handleKeyDownPopup}
                        role="menu"
                        aria-orientation="horizontal"
                        aria-labelledby={emojiButtonId}
                        {...focusWithinProps}
                    >
                        <Emoji>
                            <AdaptiveEmoji
                                ref={refs[0]}
                                emoji={modifySkinTone(emoji, 'none')}
                                onClick={handleSkinToneClick}
                            />
                        </Emoji>
                        <EmojiDivider />
                        <Emoji>
                            <AdaptiveEmoji
                                ref={refs[1]}
                                emoji={modifySkinTone(emoji, 'white')}
                                onClick={handleSkinToneClick}
                            />
                        </Emoji>
                        <Emoji>
                            <AdaptiveEmoji
                                ref={refs[2]}
                                emoji={modifySkinTone(emoji, 'creamWhite')}
                                onClick={handleSkinToneClick}
                            />
                        </Emoji>
                        <Emoji>
                            <AdaptiveEmoji
                                ref={refs[3]}
                                emoji={modifySkinTone(emoji, 'lightBrown')}
                                onClick={handleSkinToneClick}
                            />
                        </Emoji>
                        <Emoji>
                            <AdaptiveEmoji
                                ref={refs[4]}
                                emoji={modifySkinTone(emoji, 'brown')}
                                onClick={handleSkinToneClick}
                            />
                        </Emoji>
                        <Emoji>
                            <AdaptiveEmoji
                                ref={refs[5]}
                                emoji={modifySkinTone(emoji, 'darkBrown')}
                                onClick={handleSkinToneClick}
                            />
                        </Emoji>
                        <svg
                            width="28"
                            height="18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                position: 'absolute',
                                top: 'calc(100% - 2px)',
                                right: 14,
                            }}
                        >
                            <g filter="url(#filter0_dd)">
                                <path
                                    d="M16.121 7.879L23 1H5l6.879 6.879a3 3 0 004.242 0z"
                                    fill="#fff"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_dd"
                                    x="0"
                                    y="0"
                                    width="28"
                                    height="17.757"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                                    <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feMorphology
                                        radius="1"
                                        in="SourceAlpha"
                                        result="effect2_dropShadow"
                                    />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="3" />
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                    <feBlend
                                        in2="effect1_dropShadow"
                                        result="effect2_dropShadow"
                                    />
                                    <feBlend
                                        in="SourceGraphic"
                                        in2="effect2_dropShadow"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </SkinTonePopup>
                </FocusLock>
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

const EmojiDivider = styled.div`
    width: 1px;
    background-color: var(--chayns-color--002);
    border-radius: 1px;
    margin: 4px 6px;
`;

const SkinTonePopup = styled.ul`
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
        0px 1px 2px rgba(0, 0, 0, 0.12);
    bottom: 100%;
    right: -8px;
    z-index: 10;
    padding: 4px;
    margin: 0 0 4px;
    border-radius: 3px;
    display: flex;
`;

function modulo(n: number, m: number) {
    return ((n % m) + m) % m;
}
