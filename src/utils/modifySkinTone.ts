export type SkinTone =
    | 'none'
    | 'white'
    | 'creamWhite'
    | 'lightBrown'
    | 'brown'
    | 'darkBrown';

const skinTones = new Map([
    ['none', ''],
    ['white', String.fromCodePoint(0x1f3fb)],
    ['creamWhite', String.fromCodePoint(0x1f3fc)],
    ['lightBrown', String.fromCodePoint(0x1f3fd)],
    ['brown', String.fromCodePoint(0x1f3fe)],
    ['darkBrown', String.fromCodePoint(0x1f3ff)],
]);

export function modifySkinTone(emoji: string, tone: SkinTone) {
    emoji = emoji.replace(/[\u{1f3fb}-\u{1f3ff}]/u, '');

    if (tone !== 'none') {
        emoji += skinTones.get(tone);
    }

    return emoji;
}
