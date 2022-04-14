import React from 'react';
import { TComposition } from './CompositionManager';
export declare const registerRoot: (comp: React.FC) => void;
export declare const getRoot: () => React.FC<{}> | null;
export declare const addStaticComposition: <T>(composition: TComposition<T>) => void;
export declare const removeStaticComposition: (id: string) => void;
export declare const isPlainIndex: () => boolean;
export declare const getCompositionName: () => string | null;
export declare const getIsEvaluation: () => boolean;
//# sourceMappingURL=register-root.d.ts.map