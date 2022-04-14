"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_range_1 = require("../config/frame-range");
const internals_1 = require("../internals");
const expect_to_throw_1 = require("./expect-to-throw");
describe('Frame range should throw exception with invalid inputs', () => {
    const testValues = [
        [-1, /non-negative/],
        [1.111, /Frame must be an integer, but got a float \(1.111\)/],
        [Infinity, /finite number, got Infinity/],
        // @ts-expect-error
        [[0, 2, 4], /Frame range must be a tuple, got an array with length 3/],
        // @ts-expect-error
        [[], /Frame range must be a tuple, got an array with length 0/],
        [
            // @ts-expect-error
            ['0', 2],
            /Each value of frame range must be a number, but got string \("0"\)/,
        ],
        [
            [0.111, 2],
            /Each value of frame range must be an integer, but got a float \(0.111\)/,
        ],
        [
            [0, Infinity],
            /Each value of frame range must be finite, but got Infinity/,
        ],
        [[-1, 0], /Each value of frame range must be non-negative, but got -1/],
        [
            [10, 0],
            /The second value of frame range must be not smaller than the first one, but got 10-0/,
        ],
        [
            // @ts-expect-error
            '10',
            /Frame range must be a number or a tuple of numbers, but got object of type string/,
        ],
    ];
    testValues.forEach((entry) => test(`test with input ${JSON.stringify(entry[0])}`, () => (0, expect_to_throw_1.expectToThrow)(() => (0, frame_range_1.setFrameRange)(entry[0]), entry[1])));
});
describe('Frame range tests with valid inputs', () => {
    const testValues = [
        null,
        [10, 20],
        [10, 10],
        10,
        0,
    ];
    testValues.forEach((entry) => test(`test with input ${entry}`, () => {
        (0, frame_range_1.setFrameRange)(entry);
        expect(internals_1.Internals.getRange()).toEqual(entry);
    }));
});
describe('Frame range CLI should throw exception with invalid inputs', () => {
    const testValues = [
        [
            '1-2-3',
            /--frames flag must be a number or 2 numbers separated by '-', instead got 3 numbers/,
        ],
        [
            '2-1',
            /The second number of the --frames flag number should be greater or equal than first number/,
        ],
        [
            'one-two',
            /--frames flag must be a single number, or 2 numbers separated by `-`/,
        ],
        [' ', /Frame range must be a tuple, got an array with length 1/],
        ['', /Frame range must be a tuple, got an array with length 1/],
    ];
    testValues.forEach((entry) => test(`test with input ${entry[0]}`, () => (0, expect_to_throw_1.expectToThrow)(() => (0, frame_range_1.setFrameRangeFromCli)(entry[0]), entry[1])));
});
describe('Frame range CLI tests with valid inputs', () => {
    (0, frame_range_1.setFrameRange)(null);
    const testValues = [
        [0, 0],
        [10, 10],
        ['1-10', [1, 10]],
        ['10-10', [10, 10]],
        ['-', [0, 0]],
    ];
    testValues.forEach((entry) => test(`test with input ${entry[0]}`, () => {
        (0, frame_range_1.setFrameRangeFromCli)(entry[0]);
        expect(internals_1.Internals.getRange()).toEqual(entry[1]);
    }));
});
//# sourceMappingURL=range.test.js.map