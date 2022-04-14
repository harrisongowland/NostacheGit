"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFps = void 0;
const validateFps = (fps, location) => {
    if (typeof fps !== 'number') {
        throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
    }
    if (!Number.isFinite(fps)) {
        throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
    }
    if (isNaN(fps)) {
        throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
    }
    if (fps <= 0) {
        throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
    }
};
exports.validateFps = validateFps;
//# sourceMappingURL=validate-fps.js.map