"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concurrency_1 = require("../config/concurrency");
const expect_to_throw_1 = require("./expect-to-throw");
const invalidConcurrency = 'invalidConcurrency';
let defaultConcurrency;
beforeAll(() => {
    defaultConcurrency = (0, concurrency_1.getConcurrency)();
});
test('setConcurrency should throw if concurrency is not a number', () => {
    (0, expect_to_throw_1.expectToThrow)(() => 
    // @ts-expect-error
    (0, concurrency_1.setConcurrency)(invalidConcurrency), /--concurrency flag must be a number./);
});
test('setConcurrency should NOT throw if concurrency is a number', () => {
    expect(() => (0, concurrency_1.setConcurrency)(50)).not.toThrow();
});
test('getConcurrency should return null by default', () => {
    expect(defaultConcurrency === null);
});
test('getConcurrency should return number', () => {
    (0, concurrency_1.setConcurrency)(100);
    expect((0, concurrency_1.getConcurrency)()).toEqual(100);
});
//# sourceMappingURL=concurrency.test.js.map