"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_media_props_1 = require("../validate-media-props");
const expect_to_throw_1 = require("./expect-to-throw");
describe('ValidateMediaProps should throw with invalid volume inputs', () => {
    const testComponents = ['Audio', 'Video'];
    testComponents.forEach((component) => {
        test(`It should not allow an ${component} element to have a negative volume `, () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, validate_media_props_1.validateMediaProps)({ volume: -1 }, component), new RegExp(`You have passed a volume below 0 to your <${component} /> component. Volume must be between 0 and 1`));
        });
        test(`It should not allow an ${component} element to have an invalid type`, () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, validate_media_props_1.validateMediaProps)({ volume: 'invalidType' }, component), new RegExp(`You have passed a volume of type string to your <${component} /> component.`));
        });
    });
});
describe('ValidateMediaProps should not throw with valid volume inputs', () => {
    const validInputs = [
        0,
        1,
        undefined,
        () => 1,
        (x) => x,
    ];
    validInputs.forEach((vol) => test(`valid volume ${vol} shold not throw`, () => {
        // @ts-expect-error
        expect(() => (0, validate_media_props_1.validateMediaProps)({ volume: vol }, 'Video')).not.toThrow();
    }));
});
describe('ValidateMediaProps should throw with invalid playbackRate', () => {
    test(`It should not allow playbackRate of 0 or below.`, () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, validate_media_props_1.validateMediaProps)({ playbackRate: -1 }, 'Audio'), /You have passed a playbackRate of -1 to your <Audio \/> component. Playback rate must be a real number above 0./);
    });
    test(`It should not allow non-finite playbackRate.`, () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, validate_media_props_1.validateMediaProps)({ playbackRate: Infinity }, 'Audio'), /You have passed a playbackRate of Infinity to your <Audio \/> component. Playback rate must be a real number above 0./);
    });
    test(`It should not allow NaN playbackRate.`, () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, validate_media_props_1.validateMediaProps)({ playbackRate: NaN }, 'Audio'), /You have passed a playbackRate of NaN to your <Audio \/> component. Playback rate must be a real number above 0./);
    });
    test(`It should not allow regular playbackrate.`, () => {
        expect(() => (0, validate_media_props_1.validateMediaProps)({ playbackRate: 1 }, 'Audio')).not.toThrow();
    });
});
//# sourceMappingURL=media-validation.test.js.map