"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParallelEncoding = exports.setParallelEncoding = void 0;
let parallelEncoding = false;
const setParallelEncoding = (value) => {
    if (typeof value !== 'boolean') {
        throw new Error(`parallelEncoding must be a boolean but got ${typeof value} (${JSON.stringify(value)})`);
    }
    parallelEncoding = value;
};
exports.setParallelEncoding = setParallelEncoding;
const getParallelEncoding = () => parallelEncoding;
exports.getParallelEncoding = getParallelEncoding;
//# sourceMappingURL=parallel-encoding.js.map