"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSelectedCodecAndProResCombination = exports.setProResProfile = exports.getProResProfile = void 0;
const proResProfileOptions = [
    '4444-xq',
    '4444',
    'hq',
    'standard',
    'light',
    'proxy',
];
let proResProfile;
const getProResProfile = () => {
    return proResProfile;
};
exports.getProResProfile = getProResProfile;
const setProResProfile = (profile) => {
    proResProfile = profile;
};
exports.setProResProfile = setProResProfile;
const validateSelectedCodecAndProResCombination = (actualCodec, actualProResProfile) => {
    if (typeof actualProResProfile !== 'undefined' && actualCodec !== 'prores') {
        throw new TypeError('You have set a ProRes profile but the codec is not "prores". Set the codec to "prores" or remove the ProRes profile.');
    }
    if (actualProResProfile !== undefined &&
        !proResProfileOptions.includes(actualProResProfile)) {
        throw new TypeError(`The ProRes profile "${actualProResProfile}" is not valid. Valid options are ${proResProfileOptions
            .map((p) => `"${p}"`)
            .join(', ')}`);
    }
};
exports.validateSelectedCodecAndProResCombination = validateSelectedCodecAndProResCombination;
//# sourceMappingURL=prores-profile.js.map