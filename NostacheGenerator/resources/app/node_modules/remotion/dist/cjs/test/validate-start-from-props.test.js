"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_start_from_props_1 = require("../validate-start-from-props");
const expect_to_throw_1 = require("./expect-to-throw");
describe('ValidateStartFrom props should throw', () => {
    describe('Throw with invalid startFrom prop', () => {
        test('It should throw if startFrom prop is negative', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, validate_start_from_props_1.validateStartFromProps)(-40, 1), /startFrom must be greater than equal to 0 instead got -40./);
        });
        test('It should throw if startFrom is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, validate_start_from_props_1.validateStartFromProps)('10', 20), /type of startFrom prop must be a number, instead got type string./);
        });
        test('It should throw if startFrom is NaN', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, validate_start_from_props_1.validateStartFromProps)(NaN, 20), /startFrom prop can not be NaN or Infinity./);
        });
        test('It should throw if startFrom is Infinity', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, validate_start_from_props_1.validateStartFromProps)(Infinity, 20), /startFrom prop can not be NaN or Infinity./);
        });
    });
    describe('Throw with invalid endAt prop', () => {
        test('It should throw if endAt prop is negative', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, validate_start_from_props_1.validateStartFromProps)(0, -40), /endAt must be a positive number, instead got -40./);
        });
        test('It should throw if endAt is less than startFrom', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, validate_start_from_props_1.validateStartFromProps)(10, 1), /endAt prop must be greater than startFrom prop./);
        });
        test('It should throw if endAt is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, validate_start_from_props_1.validateStartFromProps)(10, '20'), /type of endAt prop must be a number, instead got type string./);
        });
        test('It should throw if endAt is NaN', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, validate_start_from_props_1.validateStartFromProps)(10, NaN), /endAt prop can not be NaN./);
        });
    });
});
//# sourceMappingURL=validate-start-from-props.test.js.map