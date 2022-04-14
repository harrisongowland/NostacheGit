"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFfmpegComplexFilter = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const createMix = (filters) => {
    const baseFilter = filters
        .map((asset) => {
        return `[a${asset.streamIndex}]`;
    })
        .join('');
    const options = [
        // Specify the number of inputs we give
        `inputs=${filters.length}`,
        // Disable any fade in transitions when a track stops
        'dropout_transition=0',
        // Audio track is as long as the longest input
        'duration=longest',
    ];
    return `${baseFilter}amix=${options.join(':')}`;
};
const createFfmpegComplexFilter = async (filters) => {
    if (!filters.length) {
        return { complexFilterFlag: null, cleanup: () => undefined };
    }
    const complexFilter = [
        ...filters.map((f) => f.filter),
        createMix(filters),
    ].join(';');
    const tempPath = await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'remotion-complex-filter'));
    const filterFile = path_1.default.join(tempPath, 'complex-filter.txt');
    await fs_1.default.promises.writeFile(filterFile, complexFilter);
    return {
        complexFilterFlag: ['-filter_complex_script', filterFile],
        cleanup: () => {
            var _a;
            ((_a = fs_1.default.promises.rm) !== null && _a !== void 0 ? _a : fs_1.default.promises.rmdir)(tempPath, {
                recursive: true,
            }).catch((err) => {
                console.error('Could not delete a temp file');
                console.error(err);
                console.error('Do you have the minimum Node.JS installed?');
            });
        },
    };
};
exports.createFfmpegComplexFilter = createFfmpegComplexFilter;
//# sourceMappingURL=create-ffmpeg-complex-filter.js.map