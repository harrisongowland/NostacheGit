"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_props_1 = require("../config/input-props");
describe('input props', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });
    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });
    test('input props in non production env', () => {
        process.env.NODE_ENV = 'development';
        const inputProps = {
            firstProperty: 'firstProperty',
            secondProperty: 'secondProperty',
        };
        process.env.INPUT_PROPS = JSON.stringify(inputProps);
        expect((0, input_props_1.getInputProps)()).toEqual(JSON.stringify(inputProps));
    });
    test('input props in production env', () => {
        process.env.NODE_ENV = 'production';
        const inputProps = {
            firstProperty: 'firstProperty',
            secondProperty: 'secondProperty',
        };
        const previousInputProps = localStorage.getItem(input_props_1.INPUT_PROPS_KEY);
        localStorage.setItem(input_props_1.INPUT_PROPS_KEY, JSON.stringify(inputProps));
        expect((0, input_props_1.getInputProps)()).toEqual(inputProps);
        if (previousInputProps) {
            localStorage.setItem(input_props_1.INPUT_PROPS_KEY, previousInputProps);
        }
        else {
            localStorage.removeItem(input_props_1.INPUT_PROPS_KEY);
        }
    });
    test('input props in production env - empty localstorage', () => {
        process.env.NODE_ENV = 'production';
        expect((0, input_props_1.getInputProps)()).toEqual({});
    });
});
//# sourceMappingURL=input-props.test.js.map