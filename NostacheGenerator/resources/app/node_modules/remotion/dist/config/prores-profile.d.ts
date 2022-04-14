import { Codec } from './codec';
declare const proResProfileOptions: readonly ["4444-xq", "4444", "hq", "standard", "light", "proxy"];
export declare type ProResProfile = typeof proResProfileOptions[number];
export declare const getProResProfile: () => ProResProfile | undefined;
export declare const setProResProfile: (profile: ProResProfile | undefined) => void;
export declare const validateSelectedCodecAndProResCombination: (actualCodec: Codec, actualProResProfile: ProResProfile | undefined) => void;
export {};
//# sourceMappingURL=prores-profile.d.ts.map