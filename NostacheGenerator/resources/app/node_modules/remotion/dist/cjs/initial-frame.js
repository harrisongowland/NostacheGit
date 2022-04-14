"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupInitialFrame = exports.INITIAL_FRAME_LOCAL_STORAGE_KEY = void 0;
exports.INITIAL_FRAME_LOCAL_STORAGE_KEY = 'remotion.initialFrame';
const getInitialFrame = () => {
    const param = localStorage.getItem(exports.INITIAL_FRAME_LOCAL_STORAGE_KEY);
    return param ? Number(param) : 0;
};
const setupInitialFrame = () => {
    window.remotion_initialFrame = getInitialFrame();
};
exports.setupInitialFrame = setupInitialFrame;
//# sourceMappingURL=initial-frame.js.map