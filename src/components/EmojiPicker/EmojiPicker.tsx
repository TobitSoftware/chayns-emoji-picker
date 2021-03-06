import styled from '@emotion/styled';
import { useRect } from '@reach/rect';
import { useFocusWithin } from '@react-aria/interactions';
import Fuse from 'fuse.js';
import React, {
    createRef,
    CSSProperties,
    KeyboardEvent,
    MutableRefObject,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import { GroupedVirtuoso, GroupedVirtuosoHandle } from 'react-virtuoso';
import { emojiCategories, EmojiData } from '../../german-emoji-data';
import { isLocalStorageAvailable } from '../../utils/isLocalStorageAvailable';
import CategoryRow from '../CategoryRow';
import { GridCell } from '../GridCell';
import Icon from '../Icon';

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

export interface EmojiPickerProps {
    /**
     * Wether the popup-window to pick an emoji should be open.
     */
    show: boolean;

    /**
     * Called when the popup requests to be closed, e.g. when the user clicks
     * away or presses the Escape-key.
     *
     * This should update the state that is passed into the `open`-prop.
     */
    onHide: () => void;

    /**
     * Called when the user picks an emoji. Receives the emoji as a string as
     * it's first argument.
     */
    onPick?: (emoji: string) => void;

    /**
     * Controls the relative horizontal position of the popup to it's anchor
     * node. Setting it to `left` will make the popup open towards the left side
     * of the anchor node, `right` to the right side.
     */
    horizontal?: 'left' | 'right';

    /**
     * Controls the relative vertical position of the popup to it's anchor
     * node. Setting it to `top` will make the popup open above the anchor node,
     * `bottom` will position the popup below the anchor node.
     */
    vertical?: 'top' | 'bottom';

    /**
     * An element that acts as the anchor for the popup. The popup's position
     * will always be relative to an anchor element, e.g. an icon button in an
     * input field that opens an emoji-picker on click.
     *
     * By default the popup is positioned absolutely, therefore it will be
     * relative to the nearest parent that is positioned `relative` or
     * `absolute`.
     *
     * If an anchor node is provided, the popup will be inserted as a direct
     * child of the `document.body` element. The position of the anchor element
     * will be measured and the popup will be positioned relatively through
     * transforms.
     *
     * This can be useful if a parent element specifies `overflow: hidden;`,
     * since the popup would not be fully visible in that case.
     */
    anchor?: RefObject<HTMLElement> | HTMLElement;
}

export function EmojiPicker({
    show,
    onHide,
    onPick,
    horizontal = 'left',
    vertical = 'top',
    anchor,
}: EmojiPickerProps) {
    const listHandle = useRef<GroupedVirtuosoHandle | null>(null);
    const windowRef = useRef<HTMLDivElement | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [fuseResults, setFuseResults] = useState(spritesheetLookupArray);

    const { focusWithinProps } = useFocusWithin({
        onBlurWithin() {
            onHide();
        },
    });

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
                name: 'H??ufig verwendet',
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
                                key={e}
                                emojiData={emojiData}
                                index={spritesheetLookupArray.indexOf(e)}
                                onSelect={(emoji) => {
                                    markRecent(emojiData);

                                    if (onPick) {
                                        onPick(emoji);
                                    }
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
        [markRecent, onPick, rows]
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

    const style: CSSProperties = {
        position: 'absolute',
    };

    switch (horizontal) {
        case 'left':
            style.right = 0;
            break;
        case 'right':
            style.left = 0;
    }

    switch (vertical) {
        case 'top':
            style.bottom = '100%';
            break;
        case 'bottom':
            style.top = '100%';
    }

    const refForRect = useMemo(() => {
        if (!anchor) {
            return createRef<HTMLElement>();
        }
        if ('current' in anchor) {
            return anchor;
        }

        const ref = createRef() as MutableRefObject<HTMLElement>;
        ref.current = anchor;

        return ref;
    }, [anchor]);

    const rect = useRect(refForRect, { observe: show });

    if (rect) {
        delete style.top;
        delete style.bottom;
        delete style.left;
        delete style.right;

        style.position = 'fixed';

        switch (horizontal) {
            case 'left':
                style.left = rect.right - WIDTH;
                break;
            case 'right':
                style.left = rect.left;
        }

        switch (vertical) {
            case 'top':
                style.top = rect.top - HEIGHT;
                break;
            case 'bottom':
                style.top = rect.bottom;
        }
    }

    if (!show) {
        return null;
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'Escape':
                onHide();
                break;
        }
    }

    const element = (
        <FocusLock>
            <PopupContainer
                ref={windowRef}
                style={style}
                onKeyDown={handleKeyDown}
                {...focusWithinProps}
            >
                <SearchBarContainer>
                    <EmojiSearchBar
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Finden"
                    />
                    <SearchIcon icon="fa-search" regular />
                </SearchBarContainer>
                <CategoryRow
                    groups={groups}
                    activeCategoryIndex={activeCategoryIndex}
                    onSelect={(index) => {
                        const listIndex = groups
                            .slice(0, index)
                            .reduce(
                                (count, { rowCount }) => count + rowCount,
                                0
                            );
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
        </FocusLock>
    );

    if (anchor) {
        return ReactDOM.createPortal(element, document.body);
    } else {
        return element;
    }
}

const WIDTH = 320;
const HEIGHT = 420;

const PopupContainer = styled.div`
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    background-color: var(--chayns-color--000);
    border-radius: 3px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);

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
    margin: 8px 8px 0;
    position: relative;
`;

const EmojiSearchBar = styled.input`
    width: 100%;
    height: 42px;
    padding: 0 10px 0 36px;

    border: 1px solid rgba(160, 160, 160, 0.3);
    border-radius: 3px;

    appearance: none;
    background-color: var(--chayns-color--000);
`;

const SearchIcon = styled(Icon)`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;

    color: var(--chayns-color--004);
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
