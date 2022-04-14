export declare const logLevels: readonly ["verbose", "info", "warn", "error"];
export declare type LogLevel = typeof logLevels[number];
export declare const getLogLevel: () => "verbose" | "info" | "warn" | "error";
export declare const setLogLevel: (newLogLevel: LogLevel) => void;
export declare const isValidLogLevel: (level: string) => boolean;
export declare const isEqualOrBelowLogLevel: (level: LogLevel) => boolean;
//# sourceMappingURL=log.d.ts.map