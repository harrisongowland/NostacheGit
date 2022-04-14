"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetIsUsedAtTime = void 0;
const assetIsUsedAtTime = (asset, frame) => {
    return (frame >= asset.startInVideo && frame < asset.startInVideo + asset.duration);
};
exports.assetIsUsedAtTime = assetIsUsedAtTime;
//# sourceMappingURL=asset-is-used-at-time.js.map