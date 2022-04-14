import { AssetAudioDetails, Assets } from './assets/types';
export declare type FfmpegFilterCalculation = {
    filter: string;
    streamIndex: number;
};
export declare const calculateFfmpegFilters: ({ assetPositions, assetAudioDetails, fps, videoTrackCount, }: {
    assetPositions: Assets;
    assetAudioDetails: Map<string, AssetAudioDetails>;
    fps: number;
    videoTrackCount: number;
}) => FfmpegFilterCalculation[];
//# sourceMappingURL=calculate-ffmpeg-filters.d.ts.map