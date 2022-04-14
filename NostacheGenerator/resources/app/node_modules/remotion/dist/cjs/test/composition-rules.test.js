"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const __1 = require("..");
const RemotionRoot_1 = require("../RemotionRoot");
const expect_to_throw_1 = require("./expect-to-throw");
const AnyComp = () => null;
describe('Render composition-rules should throw with invalid props', () => {
    test('It should report invalid component id', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, id: "invalid@id", width: 100 }, void 0)), /can only contain/);
    });
    test('It should throw if no id is passed', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)(
        // @ts-expect-error
        (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100 }, void 0)), /No id for composition passed./);
    });
    test('It should throw if multiple components have the same id', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsxs)(RemotionRoot_1.RemotionRoot, { children: [(0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100, id: "id" }, void 0), (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100, id: "id" }, void 0)] }, void 0)), /Multiple composition with id id/);
    });
});
describe('Render composition-rules should not with valid props', () => {
    test('It should validate the component id', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, id: "valid-id", width: 100 }, void 0))).not.toThrow();
    });
});
//# sourceMappingURL=composition-rules.test.js.map