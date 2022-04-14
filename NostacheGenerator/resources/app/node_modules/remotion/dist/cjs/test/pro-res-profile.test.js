"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prores_profile_1 = require("../config/prores-profile");
const expect_to_throw_1 = require("./expect-to-throw");
describe('Pro Res Profile', () => {
    const validProResProfile = 'standard';
    test('Should be able to set a ProRes profile', () => {
        (0, prores_profile_1.setProResProfile)(validProResProfile);
        expect((0, prores_profile_1.getProResProfile)()).toBe(validProResProfile);
    });
    test("Just a ProRes profile is not enough, because codec doesn't default to ProRes", () => {
        (0, expect_to_throw_1.expectToThrow)(() => {
            (0, prores_profile_1.validateSelectedCodecAndProResCombination)('aac', '4444-xq');
        }, /You have set a ProRes profile but the codec is not "prores". Set the codec to "prores" or remove the ProRes profile./);
    });
    test('Should accept a valid codec and ProRes combination', () => {
        expect((0, prores_profile_1.validateSelectedCodecAndProResCombination)('prores', '4444')).toBe(undefined);
    });
    test('Should throw on invalid ProRes name', () => {
        (0, expect_to_throw_1.expectToThrow)(() => 
        // @ts-expect-error
        (0, prores_profile_1.validateSelectedCodecAndProResCombination)('prores', 'typoed'), /The ProRes profile "typoed" is not valid. Valid options are "4444-xq", "4444", "hq", "standard", "light", "proxy"/);
    });
});
//# sourceMappingURL=pro-res-profile.test.js.map