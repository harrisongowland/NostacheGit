"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_sequence_1 = require("../config/image-sequence");
const expect_to_throw_1 = require("./expect-to-throw");
const invalidImageSequence = 'invalidImageSequence';
let defaultImageSequence;
beforeAll(() => {
    defaultImageSequence = (0, image_sequence_1.getShouldOutputImageSequence)(null);
});
afterEach(() => {
    (0, image_sequence_1.setImageSequence)(defaultImageSequence);
});
test('setImageSequence should throw if image sequence is not a boolean value', () => {
    (0, expect_to_throw_1.expectToThrow)(() => 
    // @ts-expect-error
    (0, image_sequence_1.setImageSequence)(invalidImageSequence), /setImageSequence accepts a Boolean Value/);
});
test('setImageSequence should NOT throw if image sequence is a boolean value', () => {
    expect(() => (0, image_sequence_1.setImageSequence)(true)).not.toThrow();
});
test('getShouldOutputImageSequence should return false by default', () => {
    expect((0, image_sequence_1.getShouldOutputImageSequence)(null)).toEqual(false);
});
test('getShouldOutputImageSequence should return true if a single frame number is passed', () => {
    expect((0, image_sequence_1.getShouldOutputImageSequence)(1)).toEqual(true);
});
test('getShouldOutputImageSequence should return true', () => {
    (0, image_sequence_1.setImageSequence)(true);
    expect((0, image_sequence_1.getShouldOutputImageSequence)(null)).toEqual(true);
});
//# sourceMappingURL=image-sequence.test.js.map