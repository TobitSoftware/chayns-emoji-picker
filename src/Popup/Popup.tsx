import styled from '@emotion/styled';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon.js';
import Input from 'chayns-components/lib/react-chayns-input/component/Input.js';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { GroupedVirtuoso, GroupedVirtuosoHandle } from 'react-virtuoso';
import { AdaptiveEmoji } from '../AdaptiveEmoji/AdaptiveEmoji';
import { emojiCategories, EmojiData } from '../german-emoji-data';
import { isLocalStorageAvailable } from '../isLocalStorageAvailable';

const RECENTS_KEY = 'chayns-emoji-picker__recents';

export function Popup() {
    const listHandle = useRef<GroupedVirtuosoHandle | null>(null);

    const [recents, setRecents] = useState<EmojiData[]>(() => {
        if (isLocalStorageAvailable()) {
            const entry = localStorage.getItem(RECENTS_KEY);

            if (entry) {
                const data: EmojiData[] = JSON.parse(entry);

                return data;
            }
            return [] as EmojiData[];
        }
        return [] as EmojiData[];
    });

    useEffect(() => {
        if (isLocalStorageAvailable()) {
            const recentsAsJson = JSON.stringify(recents);

            localStorage.setItem(RECENTS_KEY, recentsAsJson);
        }
    }, [recents]);

    const markRecent = useCallback((data: EmojiData) => {
        setRecents((currentRecents) => {
            const recs = currentRecents.filter((e) => e[0] !== data[0]);

            return [data, ...recs].slice(0, 32);
        });
    }, []);

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

    const [
        withRecentsElements,
        withRecentsGroupCounts,
        withRecentsCategoryNames,
    ] = useMemo(() => {
        const emojiRows = [] as Array<EmojiData[]>;

        emojiRows.push([]);

        for (const emoji of recents) {
            const lastGroup = emojiRows[emojiRows.length - 1];

            if (lastGroup.length < 8) {
                lastGroup.push(emoji);
            } else {
                emojiRows.push([emoji]);
            }
        }

        const withRecentsGroupCounts = [emojiRows.length, ...groupCounts];

        const withRecentsCategoryNames = ['Häufig verwendet', ...categoryNames];

        const withRecentsEmojiRows = [...emojiRows, ...elements];

        return [
            withRecentsEmojiRows,
            withRecentsGroupCounts,
            withRecentsCategoryNames,
        ];
    }, [categoryNames, elements, groupCounts, recents]);

    const renderGroup = useCallback(
        (index: number) => (
            <EmojiCategoryHeader>
                {withRecentsCategoryNames[index]}
            </EmojiCategoryHeader>
        ),
        [withRecentsCategoryNames]
    );

    const renderItem = useCallback(
        (rowIndex) => {
            const row = withRecentsElements[rowIndex];

            if (!row.length) {
                return (
                    <EmptyCategoryContainer>
                        Hier werden Deine meist benutzten Emojis angezeigt
                        werden.
                    </EmptyCategoryContainer>
                );
            }

            return (
                <EmojiRow>
                    {row?.map((emojiData) => {
                        const [e] = emojiData;

                        return (
                            <Emoji
                                key={e}
                                onClick={() => {
                                    markRecent(emojiData);
                                }}
                            >
                                <AdaptiveEmoji
                                    emoji={e}
                                    index={emojiArray.indexOf(e)}
                                />
                            </Emoji>
                        );
                    })}
                </EmojiRow>
            );
        },
        [emojiArray, markRecent, withRecentsElements]
    );

    const handleRangeChange = useCallback(
        ({ startIndex, endIndex }) => {
            console.log({ startIndex, endIndex });

            let activeGroupIndex = 0;
            let emojiIndex = 0;

            for (let i = 0; i < withRecentsGroupCounts.length; i++) {
                const groupCount = withRecentsGroupCounts[i];

                if (activeGroupIndex + groupCount > startIndex) {
                    emojiIndex = i;
                    break;
                }
                activeGroupIndex += groupCount;
            }

            setActiveCategoryIndex(emojiIndex);
        },
        [withRecentsGroupCounts]
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
                    groupCounts={withRecentsGroupCounts}
                    groupContent={renderGroup}
                    itemContent={renderItem}
                    rangeChanged={handleRangeChange}
                />
            </EmojiListContainer>
            <EmojiCategories>
                <CategoryButton
                    onClick={() => {
                        const index = 0;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 1;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 2;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 3;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 4;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 5;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 6;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 7;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 8;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
                                : undefined
                        }
                    />
                </CategoryButton>
                <CategoryButton
                    onClick={() => {
                        const index = 9;

                        const listIndex = withRecentsGroupCounts
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
                                ? 'chayns__color--006i'
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
    padding: 12px 10px 4px;
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
`;

const Emoji = styled.li`
    width: 36px;
    height: 36px;
    padding: 4px;
    margin: 0;
    list-style-type: none;
`;

const EmptyCategoryContainer = styled.p`
    text-align: center;
    padding: 12px 40px;
    font-size: 84%;
    color: var(--chayns-color--004);
`;

const EmojiRow = styled.div`
    display: flex;
    padding: 0 8px;
`;
