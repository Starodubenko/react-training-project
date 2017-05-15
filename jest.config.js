const path = require('path');
const babelJest = require('babel-jest');

const config = {
    collectCoverageFrom: [__dirname + '/src/*.{js,jsx}'],
    // testPathIgnorePatterns: [
    //     '<rootDit>[/\\\\](build|docs|node_modules|scripts|configs)[/\\\\]'
    // ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
    ],
    // modulePaths: [
    //     path.resolve(__dirname, './node_modules')
    // ],
    // rootDir: path.resolve(__dirname),
};

console.log(config);

module.exports = config;