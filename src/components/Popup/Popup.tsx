import styled from '@emotion/styled';
import Input from 'chayns-components/lib/react-chayns-input/component/Input.js';
import Fuse from 'fuse.js';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { GroupedVirtuoso, GroupedVirtuosoHandle } from 'react-virtuoso';
import { emojiCategories, EmojiData } from '../../german-emoji-data';
import { isLocalStorageAvailable } from '../../utils/isLocalStorageAvailable';
import CategoryRow from '../CategoryRow';
import { GridCell } from '../GridCell';

const RECENTS_KEY = 'chayns-emoji-picker__recents';

const fuse = new Fuse(
    emojiCategories.flatMap((category) => category.emojis),
    {
        keys: ['1', '2'],
        threshold: 0.24,
        shouldSort: false,
    }
);

const spritesheetLookupArray = emojiCategories.flatMap((category) =>
    category.emojis.map((emojiData) => emojiData[0])
);

const categoryImages = [
    'fa-history',
    'fa-grin-alt',
    'fa-child',
    'fa-leaf',
    'fa-mug-tea',
    'fa-plane',
    'fa-futbol',
    'fa-lightbulb',
    'fa-hashtag',
    'fa-flag',
] as const;

export function Popup() {
    const listHandle = useRef<GroupedVirtuosoHandle | null>(null);
    const windowRef = useRef<HTMLDivElement | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [fuseResults, setFuseResults] = useState(spritesheetLookupArray);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const searchResults = fuse.search(searchTerm);

            const emojiResults = searchResults.map((result) => result.item[0]);

            setFuseResults(emojiResults);
        } else {
            setFuseResults(spritesheetLookupArray);
        }
    }, [searchTerm]);

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

    const [groups, rows] = useMemo(() => {
        const groups: Array<{
            rowCount: number;
            name: string;
            icon?: string;
        }> = [];
        const rows: Array<EmojiData[]> = [];

        const recentsRows: Array<EmojiData[]> = [];

        for (const recentsEntry of recents) {
            const [emoji] = recentsEntry;

            if (fuseResults.includes(emoji)) {
                const lastCategoryRow = recentsRows[recentsRows.length - 1];

                if (lastCategoryRow && lastCategoryRow.length < 8) {
                    lastCategoryRow.push(recentsEntry);
                } else {
                    recentsRows.push([recentsEntry]);
                }
            }
        }

        if (recentsRows.length > 0) {
            groups.push({
                name: 'Häufig verwendet',
                rowCount: recentsRows.length,
                icon: categoryImages[0],
            });
            rows.push(...recentsRows);
        }

        for (let i = 0; i < emojiCategories.length; i++) {
            const category = emojiCategories[i];

            if (!category) {
                throw Error('Empty category found in emojiCategories');
            }

            const categoryRows: Array<EmojiData[]> = [];

            for (const emojiData of category.emojis) {
                const [emoji] = emojiData;

                if (fuseResults.includes(emoji)) {
                    const lastCategoryRow =
                        categoryRows[categoryRows.length - 1];

                    if (lastCategoryRow && lastCategoryRow.length < 8) {
                        lastCategoryRow.push(emojiData);
                    } else {
                        categoryRows.push([emojiData]);
                    }
                }
            }

            if (categoryRows.length > 0) {
                groups.push({
                    name: category.category,
                    rowCount: categoryRows.length,
                    icon: categoryImages[i + 1],
                });
                rows.push(...categoryRows);
            }
        }

        return [groups, rows] as const;
    }, [fuseResults, recents]);

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

    const renderGroup = useCallback(
        (index: number) => (
            <EmojiCategoryHeader>{groups[index]?.name}</EmojiCategoryHeader>
        ),
        [groups]
    );

    const renderItem = useCallback(
        (rowIndex) => {
            const row = rows[rowIndex];

            if (!row || !row.length) {
                return (
                    <EmptyCategoryContainer>
                        Hier werden Deine meist benutzten Emojis angezeigt
                        werden.
                    </EmptyCategoryContainer>
                );
            }

            return (
                <EmojiRow role="row" aria-rowindex={rowIndex}>
                    {row?.map((emojiData, columnIndex) => {
                        const [e] = emojiData;

                        return (
                            <GridCell
                                emojiData={emojiData}
                                index={spritesheetLookupArray.indexOf(e)}
                                onSelect={() => {
                                    markRecent(emojiData);
                                }}
                                rowIndex={rowIndex}
                                columnIndex={columnIndex}
                                windowRef={windowRef}
                            />
                        );
                    })}
                </EmojiRow>
            );
        },
        [markRecent, rows]
    );

    const handleRangeChange = useCallback(
        ({ startIndex }) => {
            let activeGroupIndex = 0;
            let emojiIndex = 0;

            for (let i = 0; i < groups.length; i++) {
                const row = groups[i];

                if (row) {
                    const groupCount = row.rowCount;

                    if (activeGroupIndex + groupCount > startIndex) {
                        emojiIndex = i;
                        break;
                    }
                    activeGroupIndex += groupCount;
                }
            }

            setActiveCategoryIndex(emojiIndex);
        },
        [groups]
    );

    return (
        <PopupContainer ref={windowRef}>
            <SearchBarContainer>
                <Input
                    iconLeft="far fa-search"
                    design={Input.BORDER_DESIGN}
                    placeholder="Finden"
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
            </SearchBarContainer>
            <CategoryRow
                groups={groups}
                activeCategoryIndex={activeCategoryIndex}
                onSelect={(index) => {
                    const listIndex = groups
                        .slice(0, index)
                        .reduce((count, { rowCount }) => count + rowCount, 0);

                    listHandle.current?.scrollToIndex({
                        index: listIndex,
                        behavior: 'smooth',
                    });
                }}
            />
            <EmojiListContainer>
                <GroupedVirtuoso
                    ref={listHandle}
                    groupCounts={groups.map((group) => group.rowCount)}
                    groupContent={renderGroup}
                    itemContent={renderItem}
                    rangeChanged={handleRangeChange}
                    components={{ Footer: EmojiListFooter }}
                    overscan={50}
                />
            </EmojiListContainer>
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
    user-select: none;

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

const EmojiCategoryHeader = styled.div`
    color: var(--chayns-color--006);
    background: linear-gradient(
        var(--chayns-color--000),
        rgba(var(--chayns-color-rgb--000), 0.84)
    );
    backdrop-filter: blur(8px);
    padding: 12px 10px 4px;
`;

const EmojiListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
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

const EmojiListFooter = styled.div`
    height: 8px;
`;
