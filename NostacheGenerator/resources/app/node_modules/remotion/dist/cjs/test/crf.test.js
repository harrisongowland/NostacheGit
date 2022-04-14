"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crf_1 = require("../config/crf");
const expect_to_throw_1 = require("./expect-to-throw");
describe('crf tests getDefaultCrfForCodec valid input', () => {
    // input codec, output
    const validCodecIOs = [
        ['h264', 18],
        ['h265', 23],
        ['vp8', 9],
        ['vp9', 28],
        ['mp3', 0],
        ['aac', 0],
        ['wav', 0],
    ];
    validCodecIOs.forEach((entry) => test(`default for ${entry[0]} should be ${entry[1]}`, () => expect((0, crf_1.getDefaultCrfForCodec)(entry[0])).toEqual(entry[1])));
});
describe('crf tests getDefaultCrfForCodec invalid input', () => {
    // input codec
    const invalidCodecs = ['abc', '', 3, undefined];
    invalidCodecs.forEach((entry) => test(`testing with ${entry}`, () => (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, crf_1.getDefaultCrfForCodec)(entry), new RegExp(`Got unexpected codec "${entry}"`))));
});
describe('crf tests getValidCrfRanges valid input', () => {
    // input crf, input codec, valid range
    const validInputs = [
        ['h264', [1, 51]],
        ['h265', [0, 51]],
        ['vp8', [4, 63]],
        ['vp9', [0, 63]],
        ['mp3', [0, 0]],
        ['aac', [0, 0]],
        ['wav', [0, 0]],
    ];
    validInputs.forEach((entry) => test(`valid range for ${entry[0]} should be [${entry[1]}]`, () => expect((0, crf_1.getValidCrfRanges)(entry[0])).toEqual(entry[1])));
});
describe('crf tests getValidCrfRanges invalid input', () => {
    // input codec
    const invalidInputs = ['abc', '', 3, undefined];
    invalidInputs.forEach((entry) => test(`testing with "${entry}"`, () => (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, crf_1.getValidCrfRanges)(entry), new RegExp(`Got unexpected codec "${entry}"`))));
});
describe('validateSelectedCrfAndCodecCombination valid input', () => {
    // input crf, input codec
    const validInputs = [
        [20, 'h264'],
        [1, 'h264'],
        [51, 'h264'],
        [20, 'h265'],
        [0, 'h265'],
        [51, 'h265'],
        [20, 'vp8'],
        [4, 'vp8'],
        [63, 'vp8'],
        [20, 'vp9'],
        [0, 'vp9'],
        [63, 'vp9'],
    ];
    validInputs.forEach((entry) => test(`validate with crf ${entry[0]} and codec ${entry[1]}`, () => expect(() => (0, crf_1.validateSelectedCrfAndCodecCombination)(entry[0], entry[1])).not.toThrow()));
});
describe('validateSelectedCrfAndCodecCombination invalid input', () => {
    // input crf, input codec, valid range
    const invalidInputs = [
        [80, 'h264', [1, 51]],
        [-1, 'h264', [1, 51]],
        [52, 'h264', [1, 51]],
        [80, 'h265', [0, 51]],
        [-1, 'h265', [0, 51]],
        [52, 'h265', [0, 51]],
        [80, 'vp8', [4, 63]],
        [3, 'vp8', [4, 63]],
        [64, 'vp8', [4, 63]],
        [80, 'vp9', [0, 63]],
        [-1, 'vp9', [0, 63]],
        [64, 'vp9', [0, 63]],
    ];
    invalidInputs.forEach((entry) => test(`validate with crf ${entry[0]} and codec ${entry[1]}`, () => (0, expect_to_throw_1.expectToThrow)(() => (0, crf_1.validateSelectedCrfAndCodecCombination)(entry[0], entry[1]), new RegExp(`CRF must be between ${entry[2][0]} and ${entry[2][1]} for codec ${entry[1]}. Passed: ${entry[0]}`))));
});
describe('get crf valid input', () => {
    // input crf, input codec, output crf
    const validInputs = [
        [20, 'h264', 20],
        [undefined, 'h264', 18],
        [20, 'h265', 20],
        [undefined, 'h265', 23],
        [20, 'vp8', 20],
        [undefined, 'vp8', 9],
        [20, 'vp9', 20],
        [undefined, 'vp9', 28],
    ];
    validInputs.forEach((entry) => test(`test with crf ${entry[0]} and codec ${entry[1]}`, () => {
        (0, crf_1.setCrf)(entry[0]);
        expect((0, crf_1.getActualCrf)(entry[1])).toEqual(entry[2]);
    }));
});
describe('get crf invalid input', () => {
    // input crf, input codec, valid range
    const invalidInputs = [
        [80, 'h264', [1, 51]],
        [80, 'h265', [0, 51]],
        [80, 'vp8', [4, 63]],
        [80, 'vp9', [0, 63]],
    ];
    invalidInputs.forEach((entry) => test(`test for ${entry[1]}`, () => {
        (0, crf_1.setCrf)(entry[0]);
        (0, expect_to_throw_1.expectToThrow)(() => (0, crf_1.getActualCrf)(entry[1]), new RegExp(`CRF must be between ${entry[2][0]} and ${entry[2][1]} for codec ${entry[1]}. Passed: ${entry[0]}`));
    }));
});
describe('set crf invalid input', () => {
    const invalidInputs = [null, 'abc'];
    invalidInputs.forEach((entry) => test(`test for ${entry}`, () => (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, crf_1.setCrf)(entry), /The CRF must be a number or undefined/)));
});
//# sourceMappingURL=crf.test.js.map