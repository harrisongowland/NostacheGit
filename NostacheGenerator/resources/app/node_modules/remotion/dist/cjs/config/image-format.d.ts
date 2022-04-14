import { PixelFormat } from './pixel-format';
declare const validOptions: readonly ["png", "jpeg", "none"];
export declare type ImageFormat = typeof validOptions[number];
export declare const setImageFormat: (format: ImageFormat) => void;
export declare const getUserPreferredImageFormat: () => "none" | "png" | "jpeg" | undefined;
export declare const validateSelectedPixelFormatAndImageFormatCombination: (pixelFormat: PixelFormat, imageFormat: ImageFormat) => 'none' | 'valid';
export {};
//# sourceMappingURL=image-format.d.ts.map