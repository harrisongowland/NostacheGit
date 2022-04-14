import { RenderAssetInfo } from 'remotion';
export declare type RenderFramesOutput = {
    frameCount: number;
    assetsInfo: RenderAssetInfo;
};
export declare type OnStartData = {
    frameCount: number;
};
export declare type OnErrorInfo = {
    error: Error;
    frame: number | null;
};
//# sourceMappingURL=types.d.ts.map