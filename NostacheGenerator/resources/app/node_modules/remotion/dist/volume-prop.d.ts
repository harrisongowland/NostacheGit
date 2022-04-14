export declare type VolumeProp = number | ((frame: number) => number);
export declare const evaluateVolume: ({ frame, volume, mediaVolume, }: {
    frame: number;
    volume: VolumeProp | undefined;
    mediaVolume: number;
}) => number;
//# sourceMappingURL=volume-prop.d.ts.map