"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodecName = void 0;
const remotion_1 = require("remotion");
const getCodecName = (codec) => {
    if (remotion_1.Internals.isAudioCodec(codec)) {
        return null;
    }
    if (codec === 'h264' || codec === 'h264-mkv') {
        return 'libx264';
    }
    if (codec === 'h265') {
        return 'libx265';
    }
    if (codec === 'vp8') {
        return 'libvpx';
    }
    if (codec === 'vp9') {
        return 'libvpx-vp9';
    }
    if (codec === 'prores') {
        return 'prores_ks';
    }
    throw new TypeError(`Cannot find FFMPEG codec for ${codec}`);
};
exports.getCodecName = getCodecName;
//# sourceMappingURL=get-codec-name.js.map