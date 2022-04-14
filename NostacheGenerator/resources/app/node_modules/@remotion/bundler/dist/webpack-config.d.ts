import { WebpackConfiguration, WebpackOverrideFn } from 'remotion';
export declare const webpackConfig: ({ entry, userDefinedComponent, outDir, environment, webpackOverride, onProgressUpdate, enableCaching, inputProps, envVariables, maxTimelineTracks, }: {
    entry: string;
    userDefinedComponent: string;
    outDir: string;
    environment: 'development' | 'production';
    webpackOverride?: WebpackOverrideFn | undefined;
    onProgressUpdate?: ((f: number) => void) | undefined;
    enableCaching?: boolean | undefined;
    inputProps?: object | undefined;
    envVariables?: Record<string, string> | undefined;
    maxTimelineTracks: number;
}) => WebpackConfiguration;
//# sourceMappingURL=webpack-config.d.ts.map