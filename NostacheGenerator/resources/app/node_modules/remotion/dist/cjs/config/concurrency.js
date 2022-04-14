"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConcurrency = exports.setConcurrency = void 0;
let currentConcurrency = null;
const setConcurrency = (newConcurrency) => {
    if (typeof newConcurrency !== 'number') {
        throw new Error('--concurrency flag must be a number.');
    }
    currentConcurrency = newConcurrency;
};
exports.setConcurrency = setConcurrency;
const getConcurrency = () => {
    return currentConcurrency;
};
exports.getConcurrency = getConcurrency;
//# sourceMappingURL=concurrency.js.map