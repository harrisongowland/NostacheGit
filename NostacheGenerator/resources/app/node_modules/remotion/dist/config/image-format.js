"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSelectedPixelFormatAndImageFormatCombination = exports.getUserPreferredImageFormat = exports.setImageFormat = void 0;
const validOptions = ['png', 'jpeg', 'none'];
let currentImageFormat;
const setImageFormat = (format) => {
    if (typeof format === 'undefined') {
        currentImageFormat = undefined;
        return;
    }
    if (!validOptions.includes(format)) {
        throw new TypeError(`Value ${format} is not valid as an image format.`);
    }
    currentImageFormat = format;
};
exports.setImageFormat = setImageFormat;
const getUserPreferredImageFormat = () => {
    return currentImageFormat;
};
exports.getUserPreferredImageFormat = getUserPreferredImageFormat;
// By returning a value, we improve testability as we can specifically test certain branches
const validateSelectedPixelFormatAndImageFormatCombination = (pixelFormat, imageFormat) => {
    if (imageFormat === 'none') {
        return 'none';
    }
    if (!validOptions.includes(imageFormat)) {
        throw new TypeError(`Value ${imageFormat} is not valid as an image format.`);
    }
    if (pixelFormat !== 'yuva420p' && pixelFormat !== 'yuva444p10le') {
        return 'valid';
    }
    if (imageFormat !== 'png') {
        throw new TypeError(`Pixel format was set to '${pixelFormat}' but the image format is not PNG. To render transparent videos, you need to set PNG as the image format.`);
    }
    return 'valid';
};
exports.validateSelectedPixelFormatAndImageFormatCombination = validateSelectedPixelFormatAndImageFormatCombination;
//# sourceMappingURL=image-format.js.map