"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const volume_prop_1 = require("../volume-prop");
const expect_to_throw_1 = require("./expect-to-throw");
describe('EvaluateVolume does not throw', () => {
    test('Volume is undefined', () => {
        const toEvaluate = { frame: 10, volume: undefined, mediaVolume: 1 };
        expect((0, volume_prop_1.evaluateVolume)(toEvaluate)).toEqual(1);
    });
    test('Volume is smaller than one', () => {
        const smallVolume = 0.5;
        const toEvaluate = { frame: 10, volume: smallVolume, mediaVolume: 1 };
        expect((0, volume_prop_1.evaluateVolume)(toEvaluate)).toEqual(smallVolume);
    });
    test('Volume is bigger than one', () => {
        const toEvaluate = { frame: 10, volume: 10, mediaVolume: 1 };
        expect((0, volume_prop_1.evaluateVolume)(toEvaluate)).toBe(1);
    });
    test('evaluated volume from frame that is smaller than one', () => {
        const toEvaluate = {
            frame: 1,
            volume: (frame) => frame * 0.5,
            mediaVolume: 1,
        };
        expect((0, volume_prop_1.evaluateVolume)(toEvaluate)).toBe(0.5);
    });
    test('evaluated volume from frame that is bigger than one', () => {
        const toEvaluate = {
            frame: 10,
            volume: (frame) => frame,
            mediaVolume: 1,
        };
        expect((0, volume_prop_1.evaluateVolume)(toEvaluate)).toBe(1);
    });
});
describe('evaluateVolume throws exception', () => {
    test('It should throw if volume prop is neither number nor undefined', () => {
        const toEvaluate = { frame: 10, volume: 'NaN' };
        (0, expect_to_throw_1.expectToThrow)(() => {
            // @ts-expect-error
            (0, volume_prop_1.evaluateVolume)(toEvaluate);
        }, /volume is not a function/);
    });
    test('It should throw if volume is invalid type', () => {
        const invalidVolume = 'anystring';
        const toEvaluate = { frame: 1, volume: () => invalidVolume, mediaVolume: 1 };
        // changing the test because string multiply by a number in javascript is `NaN`
        (0, expect_to_throw_1.expectToThrow)(() => {
            // @ts-expect-error
            (0, volume_prop_1.evaluateVolume)(toEvaluate);
        }, /You passed in a function to the volume prop but it returned NaN for frame 1./);
    });
    test('It should throw if volume is NaN', () => {
        const invalidVolume = NaN;
        const toEvaluate = { frame: 1, volume: () => invalidVolume, mediaVolume: 1 };
        (0, expect_to_throw_1.expectToThrow)(() => {
            (0, volume_prop_1.evaluateVolume)(toEvaluate);
        }, /You passed in a function to the volume prop but it returned NaN for frame 1/);
    });
    test('It should throw if volume returns non finite number', () => {
        const invalidVolume = Infinity;
        const toEvaluate = { frame: 1, volume: () => invalidVolume, mediaVolume: 1 };
        (0, expect_to_throw_1.expectToThrow)(() => {
            (0, volume_prop_1.evaluateVolume)(toEvaluate);
        }, /You passed in a function to the volume prop but it returned a non-finite number for frame 1/);
    });
});
//# sourceMappingURL=volume-prop.test.js.map