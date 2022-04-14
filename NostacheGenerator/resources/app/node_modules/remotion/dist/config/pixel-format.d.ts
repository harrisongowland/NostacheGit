import { Codec } from './codec';
declare const validOptions: readonly ["yuv420p", "yuva420p", "yuv422p", "yuv444p", "yuv420p10le", "yuv422p10le", "yuv444p10le", "yuva444p10le"];
export declare type PixelFormat = typeof validOptions[number];
export declare const DEFAULT_PIXEL_FORMAT: PixelFormat;
export declare const setPixelFormat: (format: PixelFormat) => void;
export declare const getPixelFormat: () => "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le";
export declare const validateSelectedPixelFormatAndCodecCombination: (pixelFormat: PixelFormat, codec: Codec) => void;
export {};
//# sourceMappingURL=pixel-format.d.ts.map