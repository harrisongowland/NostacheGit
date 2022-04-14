"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioCodecName = void 0;
const remotion_1 = require("remotion");
const getAudioCodecName = (codec) => {
    if (!remotion_1.Internals.isAudioCodec(codec)) {
        // The mkv container supports WAV, but MP4 does only support
        // AAC. Choose MKV codec for better quality because we can put in lossless audio
        if (codec === 'h264-mkv') {
            return 'pcm_s16le';
        }
        return 'aac';
    }
    if (codec === 'aac') {
        return 'aac';
    }
    if (codec === 'mp3') {
        return 'libmp3lame';
    }
    return null;
};
exports.getAudioCodecName = getAudioCodecName;
//# sourceMappingURL=get-audio-codec-name.js.map