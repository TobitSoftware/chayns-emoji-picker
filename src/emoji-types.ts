export interface Category {
    category: string;
    emojis: EmojiData[];
}

export type EmojiData = [
    emoji: string,
    description: string,
    shortcut: string,
    modifiers: string
];
