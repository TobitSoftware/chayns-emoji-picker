import styled from '@emotion/styled';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon.js';
import Input from 'chayns-components/lib/react-chayns-input/component/Input.js';
import React, { useCallback, useMemo, useRef } from 'react';
import { GroupedVirtuoso } from 'react-virtuoso';
import { AdaptiveEmoji } from '../AdaptiveEmoji/AdaptiveEmoji';
import { useCategoryTracker } from '../CategoryTracker';
import { emojiCategories, EmojiData } from '../german-emoji-data';

export function Popup() {
    const currentCategory = useCategoryTracker((state) => state.currentIndex);

    const [elements, groupCounts, categoryNames] = useMemo(() => {
        const emojiRows = [] as Array<EmojiData[]>;
        const groupCounts = [] as number[];

        for (const { emojis } of emojiCategories) {
            emojiRows.push([]);

            for (const emoji of emojis) {
                const lastGroup = emojiRows[emojiRows.length - 1];

                if (lastGroup.length < 8) {
                    lastGroup.push(emoji);
                } else {
                    emojiRows.push([emoji]);
                }
            }

            groupCounts.push(Math.ceil(emojis.length / 8));
        }

        const categoryNames = emojiCategories.map(
            (category) => category.category
        );

        return [emojiRows, groupCounts, categoryNames];
    }, []);

    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const renderGroup = useCallback(
        (index: number) => <div>{categoryNames[index]}</div>,
        [categoryNames]
    );

    const renderItem = useCallback(
        (rowIndex) => {
            const row = elements[rowIndex];

            return (
                <div style={{ display: 'flex' }}>
                    {row?.map(([e], index) => (
                        <Emoji key={e}>
                            <AdaptiveEmoji
                                emoji={e}
                                index={index + rowIndex * 8}
                            />
                        </Emoji>
                    ))}
                </div>
            );
        },
        [elements]
    );

    return (
        <PopupContainer>
            <SearchBarContainer>
                <Input
                    iconLeft="far fa-search"
                    design={Input.BORDER_DESIGN}
                    placeholder="Finden"
                />
            </SearchBarContainer>
            <WhiteGradientWrapper>
                <WhiteGradient />
            </WhiteGradientWrapper>
            <EmojiListContainer ref={scrollerRef}>
                <GroupedVirtuoso
                    groupCounts={groupCounts}
                    groupContent={renderGroup}
                    overscan={500}
                    itemContent={renderItem}
                />
            </EmojiListContainer>
            <EmojiCategories>
                <CategoryButton>
                    <Icon
                        icon="fas fa-history"
                        className={
                            currentCategory === 0
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-grin-alt"
                        className={
                            currentCategory === 1
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-child"
                        className={
                            currentCategory === 2
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-leaf"
                        className={
                            currentCategory === 3
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-mug-tea"
                        className={
                            currentCategory === 4
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-plane"
                        className={
                            currentCategory === 5
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-futbol"
                        className={
                            currentCategory === 6
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-lightbulb"
                        className={
                            currentCategory === 7
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-hashtag"
                        className={
                            currentCategory === 8
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton>
                    <Icon
                        icon="fas fa-flag"
                        className={
                            currentCategory === 9
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
            </EmojiCategories>
        </PopupContainer>
    );
}

const PopupContainer = styled.div`
    position: absolute;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    height: 420px;
    width: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    * {
        box-sizing: border-box;

        ::-webkit-scrollbar {
            width: 7px;
            height: 0;
        }
        ::-webkit-scrollbar-track {
            margin: 0 2px 0 0;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0);
            border-radius: 10px;
            box-shadow: rgba(255, 255, 255, 0.3) 0 0 0 1px;
        }
        :hover::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.45);
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.55);
        }
    }
`;

const SearchBarContainer = styled.div`
    padding: 8px 8px 0;
`;

const WhiteGradientWrapper = styled.div`
    position: relative;
`;

const WhiteGradient = styled.div`
    position: absolute;
    z-index: 10;

    width: 100%;
    height: 20px;

    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 25%,
        rgba(255, 255, 255, 0) 100%
    );
`;

const EmojiCategories = styled.div`
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 4px 8px;
    border-top: 1px solid var(--chayns-color--002);

    i.react-chayns-icon {
        color: var(--chayns-color--003);
    }
`;

const CategoryButton = styled.button`
    padding: 0;
    margin: 0;
    background: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmojiListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 8px;
`;

const Emoji = styled.li`
    width: 36px;
    height: 36px;
    padding: 4px;
    margin: 0;
    list-style-type: none;
`;
