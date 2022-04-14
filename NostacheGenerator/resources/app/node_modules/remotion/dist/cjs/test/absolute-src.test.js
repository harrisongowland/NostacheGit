"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const absolute_src_1 = require("../absolute-src");
describe('Absolute src should behave as expected', () => {
    test('Get localhost:8080', () => {
        expect((0, absolute_src_1.getAbsoluteSrc)('http://localhost:8080')).toBe('http://localhost:8080/');
    });
    test('Get localhost/hi', () => {
        expect((0, absolute_src_1.getAbsoluteSrc)('/hi')).toBe('http://localhost/hi');
    });
    test('Get data:base64', () => {
        expect((0, absolute_src_1.getAbsoluteSrc)('data:base64,image/png,abc')).toBe('data:base64,image/png,abc');
    });
});
//# sourceMappingURL=absolute-src.test.js.map