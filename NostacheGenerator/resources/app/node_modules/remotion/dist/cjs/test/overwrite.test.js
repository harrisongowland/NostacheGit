"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overwrite_1 = require("../config/overwrite");
const expect_to_throw_1 = require("./expect-to-throw");
const invalidOverwrite = 555;
let defaultOverwriteValue;
beforeAll(() => {
    defaultOverwriteValue = (0, overwrite_1.getShouldOverwrite)();
});
afterEach(() => {
    (0, overwrite_1.setOverwriteOutput)(defaultOverwriteValue);
});
test('setOverwriteOutput should throw if overwrite is not a boolean value', () => {
    (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, overwrite_1.setOverwriteOutput)(invalidOverwrite), /overwriteExisting must be a boolean but got number [(]555[)]/);
});
test('setOverwriteOutput should NOT throw if image format is a boolean value', () => {
    expect(() => (0, overwrite_1.setOverwriteOutput)(true)).not.toThrow();
});
test('getShouldOverwrite should return true by default', () => {
    expect((0, overwrite_1.getShouldOverwrite)()).toEqual(true);
});
test('setOverwriteOutput should return a boolean value', () => {
    (0, overwrite_1.setOverwriteOutput)(false);
    expect((0, overwrite_1.getShouldOverwrite)()).toEqual(false);
});
//# sourceMappingURL=overwrite.test.js.map