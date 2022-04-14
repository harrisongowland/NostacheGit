"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seekToFrame = void 0;
const seekToFrame = async ({ frame, page, }) => {
    await page.waitForFunction('window.ready === true');
    await page.evaluate((f) => {
        window.remotion_setFrame(f);
    }, frame);
    await page.waitForFunction('window.ready === true');
    await page.evaluateHandle('document.fonts.ready');
};
exports.seekToFrame = seekToFrame;
//# sourceMappingURL=seek-to-frame.js.map