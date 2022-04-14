"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyFfmpegFilter = void 0;
const remotion_1 = require("remotion");
const calculate_atempo_1 = require("./assets/calculate-atempo");
const ffmpeg_volume_expression_1 = require("./assets/ffmpeg-volume-expression");
const stringifyFfmpegFilter = ({ streamIndex, trimLeft, trimRight, channels, startInVideo, simulatenousAssets, volume, fps, playbackRate, }) => {
    const startInVideoSeconds = ((startInVideo / fps) * 1000).toFixed(); // in milliseconds
    const volumeFilter = (0, ffmpeg_volume_expression_1.ffmpegVolumeExpression)({
        volume,
        multiplier: simulatenousAssets,
        startInVideo,
        fps,
    });
    return (`[${streamIndex}:a]` +
        [
            `atrim=${trimLeft}:${trimRight}`,
            // For n channels, we delay n + 1 channels.
            // This is because `ffprobe` for some audio files reports the wrong amount
            // of channels.
            // This should be fine because FFMPEG documentation states:
            // "Unused delays will be silently ignored."
            // https://ffmpeg.org/ffmpeg-filters.html#adelay
            `adelay=${new Array(channels + 1).fill(startInVideoSeconds).join('|')}`,
            (0, calculate_atempo_1.calculateATempo)(playbackRate),
            `volume=${volumeFilter.value}:eval=${volumeFilter.eval}`,
        ]
            .filter(remotion_1.Internals.truthy)
            .join(',') +
        `[a${streamIndex}]`);
};
exports.stringifyFfmpegFilter = stringifyFfmpegFilter;
//# sourceMappingURL=stringify-ffmpeg-filter.js.map