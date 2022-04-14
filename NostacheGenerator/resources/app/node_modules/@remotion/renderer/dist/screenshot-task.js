"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._screenshotTask = void 0;
const fs_1 = __importDefault(require("fs"));
const remotion_1 = require("remotion");
const _screenshotTask = async (page, format, options) => {
    const client = page._client;
    const target = page._target;
    const perfTarget = remotion_1.Internals.perf.startPerfMeasure('activate-target');
    await client.send('Target.activateTarget', {
        targetId: target._targetId,
    });
    remotion_1.Internals.perf.stopPerfMeasure(perfTarget);
    const shouldSetDefaultBackground = options.omitBackground && format === 'png';
    if (shouldSetDefaultBackground)
        await client.send('Emulation.setDefaultBackgroundColorOverride', {
            color: { r: 0, g: 0, b: 0, a: 0 },
        });
    const cap = remotion_1.Internals.perf.startPerfMeasure('capture');
    const result = await client.send('Page.captureScreenshot', {
        format,
        quality: options.quality,
        clip: undefined,
        captureBeyondViewport: true,
    });
    remotion_1.Internals.perf.stopPerfMeasure(cap);
    if (shouldSetDefaultBackground)
        await client.send('Emulation.setDefaultBackgroundColorOverride');
    const saveMarker = remotion_1.Internals.perf.startPerfMeasure('save');
    const buffer = options.encoding === 'base64'
        ? result.data
        : Buffer.from(result.data, 'base64');
    if (options.path)
        await fs_1.default.promises.writeFile(options.path, buffer);
    remotion_1.Internals.perf.stopPerfMeasure(saveMarker);
    return buffer;
};
exports._screenshotTask = _screenshotTask;
//# sourceMappingURL=screenshot-task.js.map