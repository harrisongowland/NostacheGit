import { WebpackOverrideFn } from 'remotion';
export declare const startServer: (entry: string, userDefinedComponent: string, options?: {
    webpackOverride?: WebpackOverrideFn | undefined;
    inputProps?: object | undefined;
    envVariables?: Record<string, string> | undefined;
    port?: number | undefined;
    maxTimelineTracks?: number | undefined;
} | undefined) => Promise<number>;
//# sourceMappingURL=start-server.d.ts.map