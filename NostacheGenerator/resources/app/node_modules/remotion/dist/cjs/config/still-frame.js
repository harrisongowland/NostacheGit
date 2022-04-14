"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStillFrame = exports.setStillFrame = void 0;
const validate_frame_1 = require("../validation/validate-frame");
let stillFrame = 0;
const setStillFrame = (frame) => {
    (0, validate_frame_1.validateFrame)(frame, Infinity);
    stillFrame = frame;
};
exports.setStillFrame = setStillFrame;
const getStillFrame = () => stillFrame;
exports.getStillFrame = getStillFrame;
//# sourceMappingURL=still-frame.js.map