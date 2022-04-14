"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFfmpegFilters = void 0;
const get_simulatenous_assets_1 = require("./assets/get-simulatenous-assets");
const resolve_asset_src_1 = require("./resolve-asset-src");
const stringify_ffmpeg_filter_1 = require("./stringify-ffmpeg-filter");
const calculateFfmpegFilters = ({ assetPositions, assetAudioDetails, fps, videoTrackCount, }) => {
    const withMoreThan1Channel = assetPositions.filter((pos) => {
        return (assetAudioDetails.get((0, resolve_asset_src_1.resolveAssetSrc)(pos.src))
            .channels > 0);
    });
    return withMoreThan1Channel.map((asset) => {
        const assetTrimLeft = (asset.trimLeft / fps).toFixed(3);
        const assetTrimRight = ((asset.trimLeft + asset.duration * asset.playbackRate) /
            fps).toFixed(3);
        const audioDetails = assetAudioDetails.get((0, resolve_asset_src_1.resolveAssetSrc)(asset.src));
        const simultaneousAssets = (0, get_simulatenous_assets_1.getSimultaneousAssets)(withMoreThan1Channel, asset);
        const streamIndex = assetPositions.indexOf(asset) + videoTrackCount;
        return {
            filter: (0, stringify_ffmpeg_filter_1.stringifyFfmpegFilter)({
                streamIndex,
                channels: audioDetails.channels,
                startInVideo: asset.startInVideo,
                trimLeft: assetTrimLeft,
                trimRight: assetTrimRight,
                simulatenousAssets: simultaneousAssets.length,
                volume: asset.volume,
                fps,
                playbackRate: asset.playbackRate,
            }),
            streamIndex,
        };
    });
};
exports.calculateFfmpegFilters = calculateFfmpegFilters;
//# sourceMappingURL=calculate-ffmpeg-filters.js.map