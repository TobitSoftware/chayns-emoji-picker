import { modifySkinTone } from './modifySkinTone';

test('should add skin color to a yellow emoji', () => {
    const emoji = '👍';

    expect(modifySkinTone(emoji, 'darkBrown')).toBe('👍🏿');
});

test('should remove skin tone form a colored emoji', () => {
    const emoji = '👍🏿';

    expect(modifySkinTone(emoji, 'none')).toBe('👍');
});

test('should replace skin tone', () => {
    const emoji = '👍🏻';

    expect(modifySkinTone(emoji, 'darkBrown')).toBe('👍🏿');
});
