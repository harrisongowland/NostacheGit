"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShouldOverwrite = exports.setOverwriteOutput = void 0;
let shouldOverwrite = true;
const setOverwriteOutput = (newOverwrite) => {
    if (typeof newOverwrite !== 'boolean') {
        throw new Error(`overwriteExisting must be a boolean but got ${typeof newOverwrite} (${JSON.stringify(newOverwrite)})`);
    }
    shouldOverwrite = newOverwrite;
};
exports.setOverwriteOutput = setOverwriteOutput;
const getShouldOverwrite = () => shouldOverwrite;
exports.getShouldOverwrite = getShouldOverwrite;
//# sourceMappingURL=overwrite.js.map