"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioChannels = void 0;
const execa_1 = __importDefault(require("execa"));
async function getAudioChannels(path) {
    const args = [
        ['-v', 'error'],
        ['-show_entries', 'stream=channels'],
        ['-of', 'default=nw=1'],
        [path],
    ]
        .reduce((acc, val) => acc.concat(val), [])
        .filter(Boolean);
    const task = await (0, execa_1.default)('ffprobe', args);
    if (!task.stdout.includes('channels=')) {
        return 0;
    }
    const channels = parseInt(task.stdout.replace('channels=', ''), 10);
    if (isNaN(channels)) {
        throw new TypeError('Unexpected result from ffprobe for channel probing: ');
    }
    return channels;
}
exports.getAudioChannels = getAudioChannels;
//# sourceMappingURL=get-audio-channels.js.map