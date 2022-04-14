declare const validCodecs: readonly ["h264", "h265", "vp8", "vp9", "mp3", "aac", "wav", "prores", "h264-mkv"];
export declare type Codec = typeof validCodecs[number];
export declare type CodecOrUndefined = Codec | undefined;
declare const validLegacyFormats: readonly ["mp4", "png-sequence"];
declare type LegacyFormat = typeof validLegacyFormats[number];
declare let codec: CodecOrUndefined;
export declare const getOutputCodecOrUndefined: () => CodecOrUndefined;
export declare const DEFAULT_CODEC: Codec;
export declare const getFinalOutputCodec: ({ codec: inputCodec, fileExtension, emitWarning, }: {
    codec: CodecOrUndefined;
    fileExtension: string | null;
    emitWarning: boolean;
}) => Codec;
export declare const setOutputFormat: (newLegacyFormat: LegacyFormat) => void;
export declare const setCodec: (newCodec: CodecOrUndefined) => void;
export {};
//# sourceMappingURL=codec.d.ts.map