"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConcurrentMode = exports.setConcurrentMode = void 0;
const validOptions = ['tab', 'browser'];
let currentConcurrentMode = 'tab';
const setConcurrentMode = (mode) => {
    if (!validOptions.includes(mode)) {
        throw new TypeError(`Value ${mode} is not valid as a concurrent mode.`);
    }
    currentConcurrentMode = mode;
};
exports.setConcurrentMode = setConcurrentMode;
const getConcurrentMode = () => {
    return currentConcurrentMode;
};
exports.getConcurrentMode = getConcurrentMode;
//# sourceMappingURL=concurrent-mode.js.map