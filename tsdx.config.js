const replace = require('@rollup/plugin-replace');
const { version } = require('./package.json');

module.exports = {
    rollup(config) {
        config.plugins.unshift(
            replace({
                __pkgVersion__: JSON.stringify(version),
            })
        );
    },
};
