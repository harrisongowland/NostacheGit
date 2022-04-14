"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualCrf = exports.validateSelectedCrfAndCodecCombination = exports.getValidCrfRanges = exports.getDefaultCrfForCodec = exports.getCrfOrUndefined = exports.setCrf = void 0;
const is_audio_codec_1 = require("../is-audio-codec");
let currentCrf;
const setCrf = (newCrf) => {
    if (typeof newCrf !== 'number' && newCrf !== undefined) {
        throw new TypeError('The CRF must be a number or undefined.');
    }
    currentCrf = newCrf;
};
exports.setCrf = setCrf;
const getCrfOrUndefined = () => {
    return currentCrf;
};
exports.getCrfOrUndefined = getCrfOrUndefined;
const getDefaultCrfForCodec = (codec) => {
    if ((0, is_audio_codec_1.isAudioCodec)(codec)) {
        return 0;
    }
    if (codec === 'h264' || codec === 'h264-mkv') {
        return 18; // FFMPEG default 23
    }
    if (codec === 'h265') {
        return 23; // FFMPEG default 28
    }
    if (codec === 'vp8') {
        return 9; // FFMPEG default 10
    }
    if (codec === 'vp9') {
        return 28; // FFMPEG recommendation 31
    }
    if (codec === 'prores') {
        return 0;
    }
    throw new TypeError(`Got unexpected codec "${codec}"`);
};
exports.getDefaultCrfForCodec = getDefaultCrfForCodec;
const getValidCrfRanges = (codec) => {
    if ((0, is_audio_codec_1.isAudioCodec)(codec)) {
        return [0, 0];
    }
    if (codec === 'prores') {
        return [0, 0];
    }
    if (codec === 'h264' || codec === 'h264-mkv') {
        return [1, 51];
    }
    if (codec === 'h265') {
        return [0, 51];
    }
    if (codec === 'vp8') {
        return [4, 63];
    }
    if (codec === 'vp9') {
        return [0, 63];
    }
    throw new TypeError(`Got unexpected codec "${codec}"`);
};
exports.getValidCrfRanges = getValidCrfRanges;
const validateSelectedCrfAndCodecCombination = (crf, codec) => {
    const range = (0, exports.getValidCrfRanges)(codec);
    if (crf === 0 && (codec === 'h264' || codec === 'h264-mkv')) {
        throw new TypeError("Setting the CRF to 0 with a H264 codec is not supported anymore because of it's inconsistencies between platforms. Videos with CRF 0 cannot be played on iOS/macOS. 0 is a extreme value with inefficient settings which you probably want. Set CRF to a higher value to fix this error.");
    }
    if (crf < range[0] || crf > range[1]) {
        throw new TypeError(`CRF must be between ${range[0]} and ${range[1]} for codec ${codec}. Passed: ${crf}`);
    }
};
exports.validateSelectedCrfAndCodecCombination = validateSelectedCrfAndCodecCombination;
const getActualCrf = (codec) => {
    var _a;
    const crf = (_a = (0, exports.getCrfOrUndefined)()) !== null && _a !== void 0 ? _a : (0, exports.getDefaultCrfForCodec)(codec);
    (0, exports.validateSelectedCrfAndCodecCombination)(crf, codec);
    return crf;
};
exports.getActualCrf = getActualCrf;
//# sourceMappingURL=crf.js.map