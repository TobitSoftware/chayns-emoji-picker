const path = require('path');
const { DefinePlugin } = require('webpack');
const { version } = require('../package.json');

const toPath = (_path) => path.join(process.cwd(), _path);

// https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
/** @type {import("@storybook/react/types").StorybookConfig} */
module.exports = {
    stories: [
        '../src/**/*.stories.@(ts|tsx|js|jsx)',
        '../docs/**/*.stories.@(md|mdx)',
    ],
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
            plugins: [
                new DefinePlugin({
                    __pkgVersion__: JSON.stringify(version),
                    __DEV__: JSON.stringify(true),
                }),
                ...config.plugins,
            ],
        };
    },
};
