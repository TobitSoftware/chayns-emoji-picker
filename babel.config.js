module.exports = (api) => {
    const isTest = api.env('test');

    if (isTest) {
        return {
            presets: [
                ['@babel/env', { targets: { node: 'current' } }],
                '@babel/react',
                '@babel/typescript',
            ],
            plugins: ['@emotion'],
        };
    }

    return {
        plugins: ['@emotion'],
    };
};
