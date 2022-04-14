"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_approximately_the_same_1 = require("../is-approximately-the-same");
const spring_1 = require("../spring");
describe('Basic spring should work', () => {
    test('Basic spring to equal 0', () => {
        expect((0, spring_1.spring)({
            fps: 30,
            frame: 0,
        })).toEqual(0);
    });
    test('Basic spring to equal 1', () => {
        expect((0, spring_1.spring)({
            fps: 30,
            frame: 0,
            from: 1,
            to: 0,
        })).toEqual(1);
    });
});
describe('Spring should go to 1', () => {
    test('Should be approxmiately the same', () => {
        expect((0, is_approximately_the_same_1.isApproximatelyTheSame)((0, spring_1.spring)({
            fps: 30,
            frame: 1,
        }), 0.04941510804510185)).toBe(true);
    });
    test('Should be close to 1', () => {
        expect((0, spring_1.spring)({
            fps: 30,
            frame: 100,
        })).toBeCloseTo(1);
    });
});
//# sourceMappingURL=spring.test.js.map