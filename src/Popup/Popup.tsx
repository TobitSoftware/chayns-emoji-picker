import styled from '@emotion/styled';
import ChooseButton from 'chayns-components/lib/react-chayns-button/component/ChooseButton.js';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon.js';
import Input from 'chayns-components/lib/react-chayns-input/component/Input.js';
import React from 'react';
import { EmojiCategory } from '../EmojiCategory/EmojiCategory';
import { emojiCategories } from '../german-emoji-data';

export function Popup() {
    return (
        <PopupContainer>
            <SearchBarContainer>
                <Input iconLeft="far fa-search" design={Input.BORDER_DESIGN} />
            </SearchBarContainer>
            <EmojiList>
                <EmojiCategories>
                    <Icon icon="fas fa-history" />
                    <Icon icon="fas fa-grin-alt" />
                    <Icon icon="fas fa-child" />
                    <Icon icon="fas fa-leaf" />
                    <Icon icon="fas fa-mug-tea" />
                    <Icon icon="fas fa-plane" />
                    <Icon icon="fas fa-futbol" />
                    <Icon icon="fas fa-lightbulb" />
                    <Icon icon="fas fa-hashtag" />
                    <Icon icon="fas fa-flag" />
                </EmojiCategories>
                <EmojiListContainer>
                    {emojiCategories.map(({ category, emojis }, i) => {
                        return (
                            <EmojiCategory
                                key={category}
                                category={category}
                                emojis={emojis}
                                isFirst={i === 0}
                            />
                        );
                    })}
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

const EmojiCategoryHeader = styled.div`
    padding: 16px 4px 4px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--chayns-color--006);
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

const BottomBar = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--chayns-color--001);
`;
