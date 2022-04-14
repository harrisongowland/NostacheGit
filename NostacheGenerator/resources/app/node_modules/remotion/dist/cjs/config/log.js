"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualOrBelowLogLevel = exports.isValidLogLevel = exports.setLogLevel = exports.getLogLevel = exports.logLevels = void 0;
exports.logLevels = ['verbose', 'info', 'warn', 'error'];
let logLevel = 'info';
const getLogLevel = () => {
    return logLevel;
};
exports.getLogLevel = getLogLevel;
const setLogLevel = (newLogLevel) => {
    logLevel = newLogLevel;
};
exports.setLogLevel = setLogLevel;
const getNumberForLogLevel = (level) => {
    return exports.logLevels.indexOf(level);
};
const isValidLogLevel = (level) => {
    return getNumberForLogLevel(level) > -1;
};
exports.isValidLogLevel = isValidLogLevel;
const isEqualOrBelowLogLevel = (level) => {
    return getNumberForLogLevel(logLevel) <= getNumberForLogLevel(level);
};
exports.isEqualOrBelowLogLevel = isEqualOrBelowLogLevel;
//# sourceMappingURL=log.js.map