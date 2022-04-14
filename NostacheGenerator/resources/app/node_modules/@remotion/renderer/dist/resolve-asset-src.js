"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAssetSrc = void 0;
const url_1 = __importDefault(require("url"));
const resolveAssetSrc = (src) => {
    if (!src.startsWith('file:')) {
        return src;
    }
    const { protocol } = new URL(src);
    if (protocol === 'file:')
        return url_1.default.fileURLToPath(src);
    throw new TypeError(`Unexpected src ${src}`);
};
exports.resolveAssetSrc = resolveAssetSrc;
//# sourceMappingURL=resolve-asset-src.js.map