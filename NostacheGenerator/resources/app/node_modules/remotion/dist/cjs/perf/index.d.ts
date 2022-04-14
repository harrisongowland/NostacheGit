declare type PerfId = 'activate-target' | 'capture' | 'save';
export declare const startPerfMeasure: (marker: PerfId) => number;
export declare const stopPerfMeasure: (id: number) => void;
export declare const logPerf: () => void;
export {};
//# sourceMappingURL=index.d.ts.map