"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrameInfo = void 0;
const fs_1 = __importDefault(require("fs"));
const min_max_1 = require("./min-max");
// If the biggest frame has the number 100 (3 digits), we need to tell FFMPEG
// that it has to expect up to three digits, etc. We calculate the length of
// the biggest number.
const getFrameInfo = async ({ dir, isAudioOnly, }) => {
    if (isAudioOnly) {
        return null;
    }
    const files = await fs_1.default.promises.readdir(dir);
    const numbers = files
        .filter((f) => f.match(/element-([0-9]+)/))
        .map((f) => {
        var _a;
        return (_a = f.match(/element-([0-9]+)/)) === null || _a === void 0 ? void 0 : _a[1];
    })
        .map((f) => Number(f));
    const biggestNumber = (0, min_max_1.max)(numbers);
    const smallestNumber = (0, min_max_1.min)(numbers);
    const numberLength = String(biggestNumber).length;
    return { numberLength, startNumber: smallestNumber };
};
exports.getFrameInfo = getFrameInfo;
//# sourceMappingURL=get-frame-number-length.js.map