import styled from '@emotion/styled';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon.js';
import Input from 'chayns-components/lib/react-chayns-input/component/Input.js';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GroupedVirtuoso, GroupedVirtuosoHandle } from 'react-virtuoso';
import { AdaptiveEmoji } from '../AdaptiveEmoji/AdaptiveEmoji';
import { emojiCategories, EmojiData } from '../german-emoji-data';

export function Popup() {
    const listHandle = useRef<GroupedVirtuosoHandle | null>(null);

    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    const [elements, groupCounts, categoryNames, emojiArray] = useMemo(() => {
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

        const emojiArray = emojiRows.flat().map(([emoji]) => emoji);

        return [emojiRows, groupCounts, categoryNames, emojiArray];
    }, []);

    const renderGroup = useCallback(
        (index: number) => (
            <EmojiCategoryHeader>{categoryNames[index]}</EmojiCategoryHeader>
        ),
        [categoryNames]
    );

    const renderItem = useCallback(
        (rowIndex) => {
            const row = elements[rowIndex];

            return (
                <div style={{ display: 'flex' }}>
                    {row?.map(([e]) => (
                        <Emoji key={e}>
                            <AdaptiveEmoji
                                emoji={e}
                                index={emojiArray.indexOf(e)}
                            />
                        </Emoji>
                    ))}
                </div>
            );
        },
        [elements, emojiArray]
    );

    const handleRangeChange = useCallback(
        ({ startIndex, endIndex }) => {
            console.log({ startIndex, endIndex });

            let activeGroupIndex = 0;
            let emojiIndex = 0;

            for (let i = 0; i < groupCounts.length; i++) {
                const groupCount = groupCounts[i];

                if (activeGroupIndex + groupCount > startIndex) {
                    emojiIndex = i;
                    break;
                }
                activeGroupIndex += groupCount;
            }

            setActiveCategoryIndex(emojiIndex);
        },
        [groupCounts]
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
            <EmojiListContainer>
                <GroupedVirtuoso
                    ref={listHandle}
                    groupCounts={groupCounts}
                    groupContent={renderGroup}
                    itemContent={renderItem}
                    rangeChanged={handleRangeChange}
                />
            </EmojiListContainer>
            <EmojiCategories>
                <CategoryButton
                    onClick={() => {
                        const index = 0;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-history"
                        className={
                            activeCategoryIndex === 0
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 1;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-grin-alt"
                        className={
                            activeCategoryIndex === 1
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 2;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-child"
                        className={
                            activeCategoryIndex === 2
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 3;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-leaf"
                        className={
                            activeCategoryIndex === 3
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 4;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-mug-tea"
                        className={
                            activeCategoryIndex === 4
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 5;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-plane"
                        className={
                            activeCategoryIndex === 5
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 6;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-futbol"
                        className={
                            activeCategoryIndex === 6
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 7;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-lightbulb"
                        className={
                            activeCategoryIndex === 7
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 8;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-hashtag"
                        className={
                            activeCategoryIndex === 8
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 9;

                        const listIndex = groupCounts
                            .slice(0, index)
                            .reduce(
                                (count, groupCount) => count + groupCount,
                                0
                            );

                        listHandle.current?.scrollToIndex({
                            index: listIndex,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <Icon
                        icon="fas fa-flag"
                        className={
                            activeCategoryIndex === 9
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
    padding: 8px 8px;
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

const EmojiCategoryHeader = styled.div`
    color: var(--chayns-color--006);
    background: linear-gradient(
        var(--chayns-color--000),
        rgba(var(--chayns-color-rgb--000), 0.84)
    );
    backdrop-filter: blur(8px);
    padding-bottom: 4px;
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
