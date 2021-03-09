const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

// https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
module.exports = {
    stories: ['../**/*.stories.@(ts|tsx|js|jsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    webpackFinal: async (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    '@emotion/styled': toPath('node_modules/@emotion/styled'),
                    'emotion-theming': toPath('node_modules/@emotion/react'),
                },
            },
        };
    },
};
