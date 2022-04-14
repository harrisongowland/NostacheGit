export declare const serveStatic: (path: string, options?: {
    port?: number | undefined;
} | undefined) => Promise<{
    port: number;
    close: () => Promise<void>;
}>;
//# sourceMappingURL=serve-static.d.ts.map