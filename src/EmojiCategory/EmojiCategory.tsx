import styled from '@emotion/styled';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon.js';
import React, { ReactElement, useState } from 'react';
import { EmojiData } from '../emoji-types';

interface Props {
    category: string;
    emojis: EmojiData[];
}

export function EmojiCategory({ category, emojis }: Props): ReactElement {
    const [isOpen, setIsOpen] = useState(true);

    const handleHeaderClick = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    return (
        <>
            <EmojiCategoryHeader onClick={handleHeaderClick}>
                <span>{category}</span>
                <Chevron open={isOpen} aria-hidden="true">
                    <Icon icon="fas fa-chevron-right" />
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

const EmojiCategoryHeader = styled.button`
    display: flex;
    align-items: center;
    padding: 16px 4px 4px;
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

const EmojiGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Emoji = styled.div`
    width: 32px;
    height: 32px;
    padding: 4px;
`;
