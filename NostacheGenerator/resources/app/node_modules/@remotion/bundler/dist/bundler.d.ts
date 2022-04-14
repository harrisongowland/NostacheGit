import { WebpackOverrideFn } from 'remotion';
export declare const bundle: (entryPoint: string, onProgressUpdate?: ((progress: number) => void) | undefined, options?: {
    webpackOverride?: WebpackOverrideFn | undefined;
    outDir?: string | undefined;
    enableCaching?: boolean | undefined;
} | undefined) => Promise<string>;
//# sourceMappingURL=bundler.d.ts.map