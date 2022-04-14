"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNonNullImageFormat = void 0;
const validateNonNullImageFormat = (imageFormat) => {
    if (imageFormat !== 'jpeg' && imageFormat !== 'png') {
        throw new TypeError('Image format should be either "png" or "jpeg"');
    }
};
exports.validateNonNullImageFormat = validateNonNullImageFormat;
//# sourceMappingURL=validate-image-format.js.map