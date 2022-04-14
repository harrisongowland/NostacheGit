"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxTimelineTracks = exports.setMaxTimelineTracks = void 0;
let maxTimelineTracks = 15;
const setMaxTimelineTracks = (maxTracks) => {
    if (typeof maxTracks !== 'number') {
        throw new Error(`Need to pass a number to Config.Preview.setMaxTimelineTracks(), got ${typeof maxTracks}`);
    }
    if (Number.isNaN(maxTracks)) {
        throw new Error(`Need to pass a real number to Config.Preview.setMaxTimelineTracks(), got NaN`);
    }
    if (!Number.isFinite(maxTracks)) {
        throw new Error(`Need to pass a real number to Config.Preview.setMaxTimelineTracks(), got ${maxTracks}`);
    }
    if (maxTracks < 0) {
        throw new Error(`Need to pass a non-negative number to Config.Preview.setMaxTimelineTracks(), got ${maxTracks}`);
    }
    maxTimelineTracks = maxTracks;
};
exports.setMaxTimelineTracks = setMaxTimelineTracks;
const getMaxTimelineTracks = () => {
    return maxTimelineTracks;
};
exports.getMaxTimelineTracks = getMaxTimelineTracks;
//# sourceMappingURL=max-timeline-tracks.js.map