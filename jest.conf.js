const babelJest = require('babel-jest');
const path = require('path');

const config = {
    collectCoverageFrom: ['src/*.{js,jsx}'],
    testPathIgnorePatterns: [
        '<rootDit>[/\\\\](build|docs|node_modules|scripts|configs)[/\\\\]'
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx)$': "babel-jest"
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
    ],
    modulePaths: [
        path.resolve(__dirname, './node_modules')
    ],
    rootDir: path.resolve(__dirname),
};

module.exports = config;