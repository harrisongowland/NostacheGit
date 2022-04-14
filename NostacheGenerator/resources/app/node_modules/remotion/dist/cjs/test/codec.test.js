"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codec_1 = require("../config/codec");
const expect_to_throw_1 = require("./expect-to-throw");
// getFinalOutputCodec
describe('Codec tests valid codec input', () => {
    const validCodecInput = [
        'h264',
        'h265',
        'vp8',
        'vp9',
        'mp3',
        'aac',
        'wav',
        'h264-mkv',
    ];
    validCodecInput.forEach((entry) => test(`codec ${entry}`, () => expect((0, codec_1.getFinalOutputCodec)({
        codec: entry,
        emitWarning: false,
        fileExtension: '',
    })).toEqual(entry)));
});
describe('Codec tests undefined codec input with known extension', () => {
    const codecExtensionCombination = [
        ['vp8', 'webm'],
        ['h265', 'hevc'],
        ['mp3', 'mp3'],
        ['wav', 'wav'],
        ['aac', 'aac'],
        ['aac', 'm4a'],
    ];
    const inputCodecs = ['h264', undefined];
    inputCodecs.forEach((codec) => codecExtensionCombination.forEach((entry) => test(codec
        ? `should not look for extension ${entry[1]}`
        : `${entry[1]} should be recognized as ${entry[0]}`, () => expect((0, codec_1.getFinalOutputCodec)({
        codec,
        emitWarning: false,
        fileExtension: entry[1],
    })).toEqual(codec !== null && codec !== void 0 ? codec : entry[0]))));
});
describe('Codec tests undefined codec input with unknown extension', () => {
    const unknownExtensions = ['', 'abc'];
    unknownExtensions.forEach((entry) => test(`testing with "${entry}" as extension`, () => expect((0, codec_1.getFinalOutputCodec)({
        codec: undefined,
        emitWarning: false,
        fileExtension: entry,
    })).toEqual('h264')));
});
// setCodec
describe('Codec tests setOutputFormat', () => {
    const validCodecInputs = [
        'h264',
        'h265',
        'vp8',
        'vp9',
        undefined,
    ];
    validCodecInputs.forEach((entry) => test(`testing with ${entry}`, () => {
        (0, codec_1.setCodec)(entry);
        expect((0, codec_1.getOutputCodecOrUndefined)()).toEqual(entry);
    }));
    test('setCodec with invalid coded', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, codec_1.setCodec)('invalid'), /Codec must be one of the following:/);
    });
});
//# sourceMappingURL=codec.test.js.map