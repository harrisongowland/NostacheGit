"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preview_server_1 = require("../config/preview-server");
const expect_to_throw_1 = require("./expect-to-throw");
describe('setting preview server port', () => {
    test.each([2, 3, 3450, 8700])('accept only valid port %s', (port) => {
        (0, preview_server_1.setPort)(port);
        expect((0, preview_server_1.getServerPort)()).toBe(port);
    });
    test.each([
        ['e', `Preview server port should be a number. Got string \\(\\"e\\"\\)`],
        [-1, `Preview server port should be a number between 1 and 65535. Got -1`],
        [0, `Preview server port should be a number between 1 and 65535. Got 0`],
        [
            999999,
            `Preview server port should be a number between 1 and 65535. Got 999999`,
        ],
    ])('throw error on invalid ports %s', (port, errorPattern) => {
        // @ts-expect-error
        (0, expect_to_throw_1.expectToThrow)(() => (0, preview_server_1.setPort)(port), new RegExp(errorPattern));
    });
});
//# sourceMappingURL=preview-server.test.js.map