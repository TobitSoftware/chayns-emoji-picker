/**
 * Modifies the skin color of any emoji that supports it.
 *
 * @param emoji A string with the emoji to modify the skin tone of.
 * @param tone The desired skin tone as a string.
 * @returns A string with the modified emoji.
 */
export function modifySkinTone(emoji: string, tone: SkinTone): string {
    let modifiedEmoji = emoji.replace(/[\u{1f3fb}-\u{1f3ff}]/u, '');

    if (tone !== 'none') {
        modifiedEmoji += skinTones.get(tone);
    }

    return modifiedEmoji;
}

export type SkinTone =
    | 'none'
    | 'white'
    | 'creamWhite'
    | 'lightBrown'
    | 'brown'
    | 'darkBrown';

const skinTones = new Map([
    ['white', String.fromCodePoint(0x1f3fb)],
    ['creamWhite', String.fromCodePoint(0x1f3fc)],
    ['lightBrown', String.fromCodePoint(0x1f3fd)],
    ['brown', String.fromCodePoint(0x1f3fe)],
    ['darkBrown', String.fromCodePoint(0x1f3ff)],
]);
