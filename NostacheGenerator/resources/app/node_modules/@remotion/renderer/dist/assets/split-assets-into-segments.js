"use strict";
// Because of how FFMPEG filters work, we might have to split 1 audio
// track into multiple filters to avoid unexpected volume changes.
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitAssetsIntoSegments = void 0;
const remotion_1 = require("remotion");
const asset_is_used_at_time_1 = require("./asset-is-used-at-time");
const flatten_volume_array_1 = require("./flatten-volume-array");
// If there is a track from 0-10 seconds and one from 5-15 seconds
// we need to create the following segments:
// 1. Segment from 0-5 seconds with 1 audio source and volume=1
// 2. Segment from 5-10 seconds with 2 audio sources and volume=2 for each
// 3. Segment from 10-15 seconds with 1 audio source and volume=1
const splitAssetsIntoSegments = ({ assets, duration, }) => {
    const timeIds = new Array(duration).fill(true).map((_, frame) => {
        const sourcesAtThisTime = assets.filter((a) => {
            return (0, asset_is_used_at_time_1.assetIsUsedAtTime)(a, frame);
        });
        return sourcesAtThisTime.map((s) => s.src).join(',');
    });
    const framesAtWhichToCut = [
        0,
        ...timeIds
            .map((t, i) => {
            return {
                timeId: t,
                index: i,
            };
        })
            .filter(({ index, timeId }) => {
            return index > 0 && timeId !== timeIds[index - 1];
        })
            .map(({ index }) => index),
        duration,
    ];
    return assets
        .map((a) => {
        return framesAtWhichToCut.map((cutEnd, i) => {
            const cutStart = i === 0 ? 0 : framesAtWhichToCut[i - 1];
            const assetStart = a.startInVideo;
            const assetEnd = a.startInVideo + a.duration;
            const amountOfFramesThatGetCut = cutStart - assetStart;
            // Video goes beyond cut
            if (assetStart < cutEnd && assetEnd > cutEnd) {
                const newDuration = cutEnd - cutStart;
                return {
                    ...a,
                    startInVideo: cutStart,
                    volume: typeof a.volume === 'number'
                        ? a.volume
                        : a.volume.slice(amountOfFramesThatGetCut, newDuration + amountOfFramesThatGetCut),
                    duration: cutEnd - cutStart,
                    trimLeft: a.trimLeft + amountOfFramesThatGetCut,
                };
            }
            // Video starts before cut
            if (assetStart < cutStart && assetEnd > cutStart) {
                const newDuration = a.duration - amountOfFramesThatGetCut;
                return {
                    ...a,
                    startInVideo: cutStart,
                    volume: typeof a.volume === 'number'
                        ? a.volume
                        : a.volume.slice(amountOfFramesThatGetCut, newDuration + amountOfFramesThatGetCut),
                    duration: newDuration,
                    trimLeft: a.trimLeft + amountOfFramesThatGetCut,
                };
            }
            // Video is inside cut, leave
            if (assetStart >= cutStart && assetEnd <= cutEnd) {
                return a;
            }
            // Video is left from cut
            if (assetStart <= cutStart && assetEnd <= cutStart) {
                return null;
            }
            // Video is right from cut
            if (assetStart >= cutStart && assetEnd >= cutStart) {
                return null;
            }
            throw new Error('Unhandled');
        });
    })
        .flat(2)
        .filter(remotion_1.Internals.truthy)
        .map((a) => (0, flatten_volume_array_1.convertAssetToFlattenedVolume)(a));
};
exports.splitAssetsIntoSegments = splitAssetsIntoSegments;
//# sourceMappingURL=split-assets-into-segments.js.map