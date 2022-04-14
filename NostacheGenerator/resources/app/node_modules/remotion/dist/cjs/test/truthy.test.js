"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const truthy_1 = require("../truthy");
test.each([
    ['true', true],
    ['false', true],
    ['True', true],
    ['False', true],
    ['', false],
    ['abc', true],
    [true, true],
    [false, false],
    [null, false],
    [undefined, false],
    [0, false],
    [1, true],
    [0.5, true],
    [12, true],
    [-1, true],
    [-4, true],
])('test with %s', (input, expected) => {
    expect((0, truthy_1.truthy)(input)).toEqual(expected);
});
//# sourceMappingURL=truthy.test.js.map