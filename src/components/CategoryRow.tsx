import styled from '@emotion/styled';
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
    /**
     * Focuses a neighbour of the current category.
     *
     * @param delta The delta to the currently selected category. `1` is the
     *     next one, `-1` is the previous one.
     */
    function focusNeighbour(delta: number) {
        const activeElement = document.activeElement;

        // @ts-expect-error
        const activeIndex = Number(activeElement?.dataset?.categoryIndex);

        if (activeIndex != null) {
            const newIndex = modulo(activeIndex + delta, groups.length);

            const nextElement = document.querySelector<HTMLElement>(
                `[data-category-index="${newIndex}"]`
            );

            if (nextElement) {
                nextElement.focus?.();
            }
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                focusNeighbour(-1);
                break;
            case 'ArrowRight':
                focusNeighbour(1);
                break;
            case 'ArrowDown':
                event.preventDefault();
                focusNeighbour(1);
                break;
            case 'ArrowLeft':
                focusNeighbour(-1);
                break;
        }
    }

    return (
        <RowContainer>
            {groups.map((group, index) => {
                const isActive = activeCategoryIndex === index;

                return (
                    <CategoryButton
                        key={group.name}
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
            })}
        </RowContainer>
    );
}

const RowContainer = styled.div`
    order: 99;

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

const CategoryButton = styled.button`
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
