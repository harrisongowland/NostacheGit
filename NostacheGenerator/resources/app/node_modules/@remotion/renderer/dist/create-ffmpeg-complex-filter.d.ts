import { FfmpegFilterCalculation } from './calculate-ffmpeg-filters';
export declare const createFfmpegComplexFilter: (filters: FfmpegFilterCalculation[]) => Promise<{
    complexFilterFlag: [string, string] | null;
    cleanup: () => void;
}>;
//# sourceMappingURL=create-ffmpeg-complex-filter.d.ts.map