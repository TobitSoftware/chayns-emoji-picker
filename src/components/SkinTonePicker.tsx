import styled from '@emotion/styled';
import { useFocusWithin } from '@react-aria/interactions';
import React, {
    CSSProperties,
    KeyboardEvent,
    ReactElement,
    RefObject,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import FocusLock from 'react-focus-lock';
import { modifySkinTone, SkinTone } from '../utils/modifySkinTone';
import { modulo } from '../utils/modulo';
import { AdaptiveEmoji } from './AdaptiveEmoji';

interface Props {
    emoji: string;
    onClose: () => void;
    onSelect: (skintone: SkinTone) => void;
    parentRef: RefObject<HTMLElement | null>;
    parentId: string;
    windowRef: RefObject<HTMLElement>;
}

export default function SkinTonePicker({
    emoji,
    onClose,
    onSelect,
    parentRef,
    parentId,
    windowRef,
}: Props): ReactElement {
    const popupRef = useRef<HTMLUListElement | null>(null);
    const [refs] = useState(() =>
        Array.from(Array(6), () => React.createRef<HTMLButtonElement>())
    );

    const { focusWithinProps } = useFocusWithin({
        onBlurWithin() {
            onClose();
        },
    });

    function focusPrevious() {
        const currentFocusIndex = refs.findIndex(
            (ref) => ref.current === document.activeElement
        );

        const newIndex = modulo(currentFocusIndex - 1, refs.length);

        refs[newIndex]?.current?.focus();
    }

    function focusNext() {
        const currentFocusIndex = refs.findIndex(
            (ref) => ref.current === document.activeElement
        );

        const newIndex = modulo(currentFocusIndex + 1, refs.length);

        refs[newIndex]?.current?.focus();
    }

    function handleKeyDownPopup(event: KeyboardEvent<HTMLUListElement>) {
        event.stopPropagation();

        switch (event.key) {
            case 'Escape':
                onClose();
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

    const [positionStyles, setPositionStyles] = useState<CSSProperties>();

    useLayoutEffect(() => {
        const windowRect = windowRef.current?.getBoundingClientRect();
        const parentRect = parentRef.current?.getBoundingClientRect();

        if (windowRect && parentRect) {
            const left = parentRect.left - windowRect.left;
            const right = parentRect.right - windowRect.right;

            const isInFirstHalf =
                parentRect.width / 2 + left < windowRect.width / 2;

            if (isInFirstHalf) {
                setPositionStyles({ left: 8 - left / 1.5 });
            } else {
                setPositionStyles({ right: 8 + right / 1.5 });
            }
        }
    }, [parentRef, windowRef]);

    return (
        <FocusLock
            onDeactivation={() => {
                setTimeout(() => {
                    if (parentRef) {
                        parentRef.current?.focus();
                    }
                }, 0);
            }}
        >
            <SkinTonePopup
                ref={popupRef}
                onKeyDown={handleKeyDownPopup}
                role="menu"
                aria-orientation="horizontal"
                aria-labelledby={parentId}
                style={positionStyles}
                {...focusWithinProps}
            >
                <Emoji>
                    <AdaptiveEmoji
                        ref={refs[0]}
                        emoji={modifySkinTone(emoji, 'none')}
                        onClick={() => onSelect('none')}
                    />
                </Emoji>
                <EmojiDivider />
                <Emoji>
                    <AdaptiveEmoji
                        ref={refs[1]}
                        emoji={modifySkinTone(emoji, 'white')}
                        onClick={() => onSelect('white')}
                    />
                </Emoji>
                <Emoji>
                    <AdaptiveEmoji
                        ref={refs[2]}
                        emoji={modifySkinTone(emoji, 'creamWhite')}
                        onClick={() => onSelect('creamWhite')}
                    />
                </Emoji>
                <Emoji>
                    <AdaptiveEmoji
                        ref={refs[3]}
                        emoji={modifySkinTone(emoji, 'lightBrown')}
                        onClick={() => onSelect('lightBrown')}
                    />
                </Emoji>
                <Emoji>
                    <AdaptiveEmoji
                        ref={refs[4]}
                        emoji={modifySkinTone(emoji, 'brown')}
                        onClick={() => onSelect('brown')}
                    />
                </Emoji>
                <Emoji>
                    <AdaptiveEmoji
                        ref={refs[5]}
                        emoji={modifySkinTone(emoji, 'darkBrown')}
                        onClick={() => onSelect('darkBrown')}
                    />
                </Emoji>
            </SkinTonePopup>
            <Arrow />
        </FocusLock>
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
    z-index: 10;
    padding: 4px;
    margin: 0 0 4px;
    border-radius: 3px;
    display: flex;
`;

function Arrow() {
    return (
        <ArrowSvg fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
        </ArrowSvg>
    );
}

const ArrowSvg = styled.svg`
    width: 28px;
    height: 18px;

    position: absolute;
    z-index: 11;
    bottom: calc(100% - 12px);
    right: 50%;
    transform: translateX(50%);
`;
