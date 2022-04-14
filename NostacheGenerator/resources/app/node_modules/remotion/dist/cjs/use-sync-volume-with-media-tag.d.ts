import { RefObject } from 'react';
import { VolumeProp } from './volume-prop';
export declare type UseSyncVolumeWithMediaTagOptions = {
    volumePropFrame: number;
    actualVolume: number;
    volume?: VolumeProp;
    mediaVolume: number;
    mediaRef: RefObject<HTMLVideoElement | HTMLAudioElement>;
};
export declare const useSyncVolumeWithMediaTag: ({ volumePropFrame, actualVolume, volume, mediaVolume, mediaRef, }: UseSyncVolumeWithMediaTagOptions) => void;
//# sourceMappingURL=use-sync-volume-with-media-tag.d.ts.map