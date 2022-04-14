"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFrameForVolumeProp = exports.useMediaStartsAt = void 0;
const react_1 = require("react");
const sequencing_1 = require("../sequencing");
const use_frame_1 = require("../use-frame");
const useMediaStartsAt = () => {
    var _a;
    const parentSequence = (0, react_1.useContext)(sequencing_1.SequenceContext);
    const startsAt = Math.min(0, (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a !== void 0 ? _a : 0);
    return startsAt;
};
exports.useMediaStartsAt = useMediaStartsAt;
/**
 * When passing a function as the prop for `volume`,
 * we calculate the way more intuitive value for currentFrame
 */
const useFrameForVolumeProp = () => {
    const frame = (0, use_frame_1.useCurrentFrame)();
    const startsAt = (0, exports.useMediaStartsAt)();
    return frame + startsAt;
};
exports.useFrameForVolumeProp = useFrameForVolumeProp;
//# sourceMappingURL=use-audio-frame.js.map