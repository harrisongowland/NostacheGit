"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetAudioDetails = void 0;
const p_limit_1 = __importDefault(require("p-limit"));
const get_concurrency_1 = require("../get-concurrency");
const get_audio_channels_1 = require("./get-audio-channels");
async function getAssetAudioDetails(options) {
    var _a;
    const uniqueAssets = [...new Set(options.assetPaths)];
    const actualParallelism = (0, get_concurrency_1.getActualConcurrency)((_a = options.parallelism) !== null && _a !== void 0 ? _a : null);
    const parallelLimit = (0, p_limit_1.default)(actualParallelism);
    const audioChannelTasks = uniqueAssets.map((path) => parallelLimit(() => (0, get_audio_channels_1.getAudioChannels)(path)));
    const result = await Promise.all(audioChannelTasks);
    const mappedResults = result.map((channels, index) => {
        return [uniqueAssets[index], { channels }];
    });
    return new Map(mappedResults);
}
exports.getAssetAudioDetails = getAssetAudioDetails;
//# sourceMappingURL=get-asset-audio-details.js.map