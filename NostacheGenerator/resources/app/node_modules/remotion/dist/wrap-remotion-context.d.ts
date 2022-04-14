import React from 'react';
export declare function useRemotionContexts(): {
    compositionManagerCtx: import("./CompositionManager").CompositionManagerContext;
    timelineContext: import("./timeline-position-state").TimelineContextValue;
    setTimelineContext: import("./timeline-position-state").SetTimelineContextValue;
    sequenceContext: import("./sequencing").SequenceContextType | null;
    nonceContext: import("./nonce").TNonceContext;
};
export interface RemotionContextProviderProps {
    contexts: ReturnType<typeof useRemotionContexts>;
    children: React.ReactNode;
}
export declare const RemotionContextProvider: (props: RemotionContextProviderProps) => JSX.Element;
//# sourceMappingURL=wrap-remotion-context.d.ts.map