import { RefObject } from 'react';
import { VolumeProp } from './volume-prop';
export declare const useMediaInTimeline: ({ volume, mediaVolume, mediaRef, src, mediaType, }: {
    volume: VolumeProp | undefined;
    mediaVolume: number;
    mediaRef: RefObject<HTMLAudioElement | HTMLVideoElement>;
    src: string | undefined;
    mediaType: 'audio' | 'video';
}) => void;
//# sourceMappingURL=use-media-in-timeline.d.ts.map