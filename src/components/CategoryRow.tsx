import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { KeyboardEvent, ReactElement } from 'react';
import { modulo } from '../utils/modulo';
import Icon from './Icon';

interface Props {
    groups: Array<{ rowCount: number; icon?: string; name: string }>;
    activeCategoryIndex: number;
    onSelect: (index: number) => void;
}

export default function CategoryRow({
    groups,
    activeCategoryIndex,
    onSelect,
}: Props): ReactElement {
    function focusPrevious() {
        const activeElement = document.activeElement;

        // @ts-expect-error
        const activeIndex = Number(activeElement?.dataset?.categoryIndex);

        if (activeIndex != null) {
            const newIndex = modulo(activeIndex - 1, groups.length);

            const nextElement = document.querySelector(
                `[data-category-index="${newIndex}"]`
            );

            if (nextElement) {
                // @ts-expect-error
                nextElement.focus?.();
            }
        }
    }

    function focusNext() {
        const activeElement = document.activeElement;

        // @ts-expect-error
        const activeIndex = Number(activeElement?.dataset?.categoryIndex);

        if (activeIndex != null) {
            const newIndex = modulo(activeIndex + 1, groups.length);

            const nextElement = document.querySelector(
                `[data-category-index="${newIndex}"]`
            );

            if (nextElement) {
                // @ts-expect-error
                nextElement.focus?.();
            }
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        switch (event.key) {
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

    const buttons = groups.map((group, index) => {
        const isActive = activeCategoryIndex === index;

        return (
            <CategoryButton
                key={group.name}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                data-category-index={index}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelect(index)}
                onKeyDown={handleKeyDown}
                aria-label={`Scrolle zu ${group.name}`}
            >
                <CategoryIcon
                    icon={group.icon || ''}
                    aria-hidden
                    active={isActive}
                    solid
                />
            </CategoryButton>
        );
    });

    return (
        <RowContainer>
            <AnimatePresence initial={false}>{buttons}</AnimatePresence>
        </RowContainer>
    );
}

const RowContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    padding: 4px 8px;
    border-top: 1px solid var(--chayns-color--002);
`;

const CategoryIcon = styled(Icon)<{ active: boolean }>`
    color: ${(props) =>
        props.active
            ? 'var(--chayns-color--007) !important'
            : 'var(--chayns-color--003)'};

    transition: color 80ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const CategoryButton = styled(motion.button)`
    padding: 0;
    margin: 0;
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 3px;
    background-color: transparent;
    transition: background-color 80ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background-color: var(--chayns-color--001);
    }

    &:focus {
        background-color: var(--chayns-color--002);

        ${CategoryIcon} {
            color: var(--chayns-color--004);
        }
    }
`;
