"use strict";
// Determine how many other audio tracks are not being finished yet given
// an audio track. This includes audio tracks that will be played in the future.
// Because of split-assets-into-segments, we are guaranteed to have no overlapping
// audio tracks.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimultaneousAssets = void 0;
const getSimultaneousAssets = (allAssets, asset) => {
    return allAssets.filter((a) => {
        return a.startInVideo >= asset.startInVideo;
    });
};
exports.getSimultaneousAssets = getSimultaneousAssets;
//# sourceMappingURL=get-simulatenous-assets.js.map