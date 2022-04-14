"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_image_format_1 = require("../validation/validate-image-format");
test('"none" is not a valid image format', () => {
    expect(() => (0, validate_image_format_1.validateNonNullImageFormat)('jpeg')).not.toThrow();
    expect(() => (0, validate_image_format_1.validateNonNullImageFormat)('png')).not.toThrow();
    expect(() => (0, validate_image_format_1.validateNonNullImageFormat)('none')).toThrow(/Image format should be either "png" or "jpeg"/);
});
//# sourceMappingURL=validate-image-format.test.js.map