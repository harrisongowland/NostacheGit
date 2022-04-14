"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuality = exports.setQuality = void 0;
const validate_quality_1 = require("../validation/validate-quality");
const defaultValue = undefined;
let quality = defaultValue;
const setQuality = (q) => {
    (0, validate_quality_1.validateQuality)(q);
    if (q === 0 || q === undefined) {
        quality = defaultValue;
        return;
    }
    quality = q;
};
exports.setQuality = setQuality;
const getQuality = () => quality;
exports.getQuality = getQuality;
//# sourceMappingURL=quality.js.map