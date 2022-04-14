import { AssetVolume } from './types';
declare type FfmpegEval = 'once' | 'frame';
declare type FfmpegVolumeExpression = {
    eval: FfmpegEval;
    value: string;
};
export declare const ffmpegVolumeExpression: ({ volume, multiplier, startInVideo, fps, }: {
    volume: AssetVolume;
    multiplier: number;
    startInVideo: number;
    fps: number;
}) => FfmpegVolumeExpression;
export {};
//# sourceMappingURL=ffmpeg-volume-expression.d.ts.map