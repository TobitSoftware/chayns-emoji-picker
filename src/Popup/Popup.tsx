import styled from '@emotion/styled';
import ChooseButton from 'chayns-components/lib/react-chayns-button/component/ChooseButton.js';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon.js';
import Input from 'chayns-components/lib/react-chayns-input/component/Input.js';
import React, { useMemo, useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
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

    return (
        <PopupContainer>
            <SearchBarContainer>
                <Input iconLeft="far fa-search" design={Input.BORDER_DESIGN} />
            </SearchBarContainer>
            <EmojiList>
                <EmojiCategories>
                    <Icon
                        icon="fas fa-history"
                        className={
                            currentCategory === 0
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-grin-alt"
                        className={
                            currentCategory === 1
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-child"
                        className={
                            currentCategory === 2
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-leaf"
                        className={
                            currentCategory === 3
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-mug-tea"
                        className={
                            currentCategory === 4
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-plane"
                        className={
                            currentCategory === 5
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-futbol"
                        className={
                            currentCategory === 6
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-lightbulb"
                        className={
                            currentCategory === 7
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-hashtag"
                        className={
                            currentCategory === 8
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                    <Icon
                        icon="fas fa-flag"
                        className={
                            currentCategory === 9
                                ? 'chayns__color--009i'
                                : undefined
                        }
                    />
                </EmojiCategories>
                <EmojiListContainer ref={scrollerRef}>
                    <Virtuoso
                        groupCounts={groupCounts}
                        groupContent={(index: number) => (
                            <div>{categoryNames[index]}</div>
                        )}
                        overscan={500}
                        itemContent={(index) => {
                            const row = elements[index];

                            console.log(row);

                            return (
                                <div style={{ display: 'flex' }}>
                                    {row?.map(([e]) => (
                                        <Emoji>
                                            <AdaptiveEmoji emoji={e} />
                                        </Emoji>
                                    ))}
                                </div>
                            );
                        }}
                    />

                    {/* {emojiCategories.map(({ category, emojis }, i) => {
                        return (
                            <EmojiCategory
                                key={category}
                                category={category}
                                emojis={emojis}
                                index={i + 1}
                                scrollContainer={scrollerRef.current}
                            />
                        );
                    })} */}
                </EmojiListContainer>
            </EmojiList>
            <BottomBar>
                <ChooseButton>🖐️ Hauttöne</ChooseButton>
            </BottomBar>
        </PopupContainer>
    );
}

const PopupContainer = styled.div`
    position: absolute;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    height: 420px;
    width: 380px;
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
    padding: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const EmojiList = styled.div`
    flex: 1;
    display: flex;
    overflow: hidden;
`;

const EmojiCategories = styled.div`
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 48px;

    i.react-chayns-icon {
        color: var(--chayns-color--004);
    }
`;

const EmojiListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 8px;
`;

const BottomBar = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--chayns-color--001);
`;

const Emoji = styled.li`
    width: 36px;
    height: 36px;
    padding: 4px;
    margin: 0;
    list-style-type: none;
`;
