"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDurationInFrames = void 0;
const validateDurationInFrames = (durationInFrames, component) => {
    if (typeof durationInFrames !== 'number') {
        throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
    }
    if (durationInFrames <= 0) {
        throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
    }
    if (durationInFrames % 1 !== 0) {
        throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
    }
};
exports.validateDurationInFrames = validateDurationInFrames;
//# sourceMappingURL=validate-duration-in-frames.js.map