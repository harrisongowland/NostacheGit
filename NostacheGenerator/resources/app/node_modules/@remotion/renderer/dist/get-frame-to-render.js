"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrameToRender = void 0;
const getFrameToRender = (frameRange, index) => {
    if (typeof frameRange === 'object' && frameRange !== null) {
        return index + frameRange[0];
    }
    if (typeof frameRange === 'number') {
        return frameRange;
    }
    return index;
};
exports.getFrameToRender = getFrameToRender;
//# sourceMappingURL=get-frame-to-render.js.map