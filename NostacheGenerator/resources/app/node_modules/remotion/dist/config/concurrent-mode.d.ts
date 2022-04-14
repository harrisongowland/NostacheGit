declare const validOptions: readonly ["tab", "browser"];
export declare type ConcurrentMode = typeof validOptions[number];
export declare const setConcurrentMode: (mode: ConcurrentMode) => void;
export declare const getConcurrentMode: () => "tab" | "browser";
export {};
//# sourceMappingURL=concurrent-mode.d.ts.map