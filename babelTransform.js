'use strict';

const babelJest = require('babel-jest');

const babelTransformer = babelJest.createTransformer({
    presets: [require.resolve('babel-preset-react-app')],
    plugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
    babelrc: false,
    process() {
        return 'module.exports = {};';
    }
});

module.export = babelTransformer;
