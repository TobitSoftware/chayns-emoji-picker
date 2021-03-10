import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AdaptiveEmoji } from '../AdaptiveEmoji/AdaptiveEmoji';
import { useCategoryTracker } from '../CategoryTracker';
import { EmojiData } from '../german-emoji-data';
import Icon from '../Icon';

interface Props {
    category: string;
    emojis: EmojiData[];
    index: number;
    scrollContainer: HTMLDivElement | null;
}

export function EmojiCategory({
    category,
    emojis,
    index,
    scrollContainer,
}: Props): ReactElement {
    const [isOpen, setIsOpen] = useState(true);

    const updateCategory = useCategoryTracker((state) => state.update);

    const [ref, inView, entry] = useInView({
        root: scrollContainer,
    });

    const lastEntryRef = useRef(0);

    useEffect(() => {
        if (entry) {
            const lastYPosition = lastEntryRef.current;
            const currentYPosition = entry.boundingClientRect.y;
            if (!inView) {
                if (lastYPosition > currentYPosition) {
                    updateCategory(index + 1);
                }
            } else {
                if (lastYPosition < currentYPosition) {
                    updateCategory(index);
                }
            }

            lastEntryRef.current = entry.boundingClientRect.y;
        }
    }, [entry, inView, index, updateCategory]);

    const handleHeaderClick = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    return (
        <div ref={ref}>
            <EmojiCategoryHeader
                onClick={handleHeaderClick}
                isFirst={index === 0}
            >
                <span>{category}</span>
                <Chevron open={isOpen} aria-hidden="true">
                    <Icon icon="fa-chevron-right" solid />
                </Chevron>
            </EmojiCategoryHeader>
            <EmojiGrid hide={!isOpen}>
                {emojis.map(([emoji]) => (
                    <Emoji>
                        <AdaptiveEmoji key={emoji} emoji={emoji} />
                    </Emoji>
                ))}
            </EmojiGrid>
        </div>
    );
}

const EmojiCategoryHeader = styled.button<{ isFirst: boolean }>`
    display: flex;
    align-items: center;
    padding: ${(props) => (props.isFirst ? '4px' : '16px')} 4px 4px;
    margin: 0;
    background: none;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--chayns-color--006);
`;

const Chevron = styled.span<{ open: boolean }>`
    display: inline-block;
    transform: rotate(${(props) => (props.open ? '90deg' : '0')});
    transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
    margin-left: 8px;

    i.react-chayns-icon {
        color: var(--chayns-color--006);
        font-size: 10px;
    }
`;

const EmojiGrid = styled.ul<{ hide: boolean }>`
    display: ${(props) => (props.hide ? 'none' : 'flex')};
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
`;

const Emoji = styled.li`
    width: 36px;
    height: 36px;
    padding: 4px;
    margin: 0;
    list-style-type: none;
`;
