"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_frame_1 = require("../validation/validate-frame");
const expect_to_throw_1 = require("./expect-to-throw");
test('Validate frame', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, validate_frame_1.validateFrame)(-1, 100), /Frame -1 cannot be negative/);
    (0, expect_to_throw_1.expectToThrow)(() => (0, validate_frame_1.validateFrame)(Infinity, 100), /Frame Infinity is not finite/);
    (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, validate_frame_1.validateFrame)('hithere', 100), /Argument passed for "frame" is not a number: hithere/);
    (0, expect_to_throw_1.expectToThrow)(() => (0, validate_frame_1.validateFrame)(3, 1), /Cannot use frame 3: Duration of composition is 1, therefore the highest frame that can be rendered is 0/);
    (0, expect_to_throw_1.expectToThrow)(() => (0, validate_frame_1.validateFrame)(2.99, 10), /Argument for frame must be an integer, but got 2.99/);
    expect(() => (0, validate_frame_1.validateFrame)(0, 1)).not.toThrow();
    expect(() => (0, validate_frame_1.validateFrame)(1, 2)).not.toThrow();
});
//# sourceMappingURL=validate-frame.test.js.map