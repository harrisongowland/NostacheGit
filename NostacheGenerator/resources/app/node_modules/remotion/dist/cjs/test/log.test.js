"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../config/log");
describe('test loglevel getter and setter', () => {
    test('default log level', () => {
        expect((0, log_1.getLogLevel)()).toEqual('info');
    });
    test.each(['verbose', 'warn', 'error', 'info'])('test for %s', (loglevel) => {
        (0, log_1.setLogLevel)(loglevel);
        expect((0, log_1.getLogLevel)()).toEqual(loglevel);
    });
});
describe('loglevel validity', () => {
    test.each(['abc', 'aalsadj', ''])('is %s an invalid level', (level) => {
        expect((0, log_1.isValidLogLevel)(level)).toEqual(false);
    });
    test.each(['verbose', 'info', 'warn', 'error'])('is %s a valid level', (level) => {
        expect((0, log_1.isValidLogLevel)(level)).toEqual(true);
    });
});
describe('loglevel comparison', () => {
    test.each([
        ['verbose', 'verbose'],
        ['verbose', 'info'],
        ['verbose', 'warn'],
        ['verbose', 'error'],
        ['info', 'info'],
        ['info', 'warn'],
        ['info', 'error'],
        ['warn', 'warn'],
        ['warn', 'error'],
        ['error', 'error'],
    ])('%s is equal or below %s', (level1, level2) => {
        (0, log_1.setLogLevel)(level1);
        expect((0, log_1.isEqualOrBelowLogLevel)(level2)).toEqual(true);
    });
    test.each([
        ['info', 'verbose'],
        ['warn', 'verbose'],
        ['error', 'verbose'],
        ['warn', 'info'],
        ['error', 'info'],
        ['error', 'warn'],
    ])('%s is not equal or below %s', (level1, level2) => {
        (0, log_1.setLogLevel)(level1);
        expect((0, log_1.isEqualOrBelowLogLevel)(level2)).toEqual(false);
    });
});
//# sourceMappingURL=log.test.js.map