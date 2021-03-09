import styled from '@emotion/styled';
import React, { ReactElement, useState } from 'react';
import { EmojiData } from '../german-emoji-data';
import Icon from '../Icon';

interface Props {
    category: string;
    emojis: EmojiData[];
    isFirst: boolean;
}

export function EmojiCategory({
    category,
    emojis,
    isFirst,
}: Props): ReactElement {
    const [isOpen, setIsOpen] = useState(true);

    const handleHeaderClick = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    return (
        <>
            <EmojiCategoryHeader onClick={handleHeaderClick} isFirst={isFirst}>
                <span>{category}</span>
                <Chevron open={isOpen} aria-hidden="true">
                    <Icon icon="fa-chevron-right" solid />
                </Chevron>
            </EmojiCategoryHeader>
            {isOpen && (
                <EmojiGrid>
                    {emojis.map(([emoji]) => (
                        <Emoji key={emoji}>{emoji}</Emoji>
                    ))}
                </EmojiGrid>
            )}
        </>
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

const EmojiGrid = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
`;

const Emoji = styled.li`
    width: 32px;
    height: 32px;
    padding: 4px;
    margin: 0;
    list-style-type: none;
`;
