const jestt = require('jest');
const argv = process.argv.slice(2);
const path = require('path');
const config = require('./jest.conf.js');

process.env.NODE_ENV = 'test';

if (argv.indexOf('--coverage')  < 0) {
    argv.push('--watch');
}

argv.push('--config', JSON.stringify(config));

jestt.run(argv);