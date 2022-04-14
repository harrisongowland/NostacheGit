"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsToFfmpegInputs = void 0;
const assetsToFfmpegInputs = ({ assets, isAudioOnly, frameCount, fps, }) => {
    if (isAudioOnly && assets.length === 0) {
        return [
            ['-f', 'lavfi'],
            ['-i', 'anullsrc'],
            ['-t', (frameCount / fps).toFixed(4)],
        ];
    }
    return assets.map((path) => ['-i', path]);
};
exports.assetsToFfmpegInputs = assetsToFfmpegInputs;
//# sourceMappingURL=assets-to-ffmpeg-inputs.js.map