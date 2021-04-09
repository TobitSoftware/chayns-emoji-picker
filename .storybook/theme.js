import { create } from '@storybook/theming';

export const theme = create({
    base: 'light',

    colorPrimary: '#2563EB',
    colorSecondary: '#3B82F6',

    // UI
    appBg: '#F3F4F6',
    appContentBg: '#F9FAFB',
    appBorderColor: '#E4E4E7',
    appBorderRadius: 2,

    // Typography
    fontBase: "'Inter var', sans-serif",
    fontCode: 'monospace',

    // Text colors
    textColor: '#18181B',
    textInverseColor: '#FAFAFA',

    // Toolbar default and active colors
    barTextColor: '#A1A1AA',
    barSelectedColor: '#3F3F46',
    barBg: '#F9FAFB',

    // Form colors
    inputBg: 'white',
    inputBorder: '#E4E4E7',
    inputTextColor: '#18181B',
    inputBorderRadius: 3,

    brandTitle: 'chayns-emoji-picker',
    brandUrl: 'https://github.com/TobitSoftware/chayns-emoji-picker',
});
