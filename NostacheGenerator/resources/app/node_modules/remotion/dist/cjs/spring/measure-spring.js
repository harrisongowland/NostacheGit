"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureSpring = void 0;
const validate_fps_1 = require("../validation/validate-fps");
const spring_utils_1 = require("./spring-utils");
function measureSpring({ fps, config = {}, threshold = 0.005, from = 0, to = 1, }) {
    if (typeof threshold !== 'number') {
        throw new TypeError(`threshold must be a number, got ${threshold} of type ${typeof threshold}`);
    }
    if (threshold === 0) {
        return Infinity;
    }
    if (threshold === 1) {
        return 0;
    }
    if (isNaN(threshold)) {
        throw new TypeError('Threshold is NaN');
    }
    if (!Number.isFinite(threshold)) {
        throw new TypeError('Threshold is not finite');
    }
    if (threshold < 0) {
        throw new TypeError('Threshold is below 0');
    }
    (0, validate_fps_1.validateFps)(fps, 'to the measureSpring() function');
    const range = Math.abs(from - to);
    let frame = 0;
    let finishedFrame = 0;
    const calc = () => {
        return (0, spring_utils_1.springCalculation)({
            fps,
            frame,
            config,
            from,
            to,
        });
    };
    let animation = calc();
    const calcDifference = () => {
        return (Math.abs(animation.current - animation.toValue) /
            (range === 0 ? 1 : range));
    };
    let difference = calcDifference();
    while (difference >= threshold) {
        frame++;
        animation = calc();
        difference = calcDifference();
    }
    // Since spring is bouncy, just because it's under the threshold we
    // cannot be sure it's done. We need to animate further until it stays in the
    // threshold for, say, 20 frames.
    finishedFrame = frame;
    for (let i = 0; i < 20; i++) {
        frame++;
        animation = calc();
        difference = calcDifference();
        if (difference >= threshold) {
            i = 0;
            finishedFrame = frame + 1;
        }
    }
    return finishedFrame;
}
exports.measureSpring = measureSpring;
//# sourceMappingURL=measure-spring.js.map