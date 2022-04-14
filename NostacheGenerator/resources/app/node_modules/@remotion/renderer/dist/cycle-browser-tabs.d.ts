import { openBrowser } from './open-browser';
declare type Await<T> = T extends PromiseLike<infer U> ? U : T;
export declare const cycleBrowserTabs: (openedBrowser: Await<ReturnType<typeof openBrowser>>) => {
    stopCycling: () => void;
};
export {};
//# sourceMappingURL=cycle-browser-tabs.d.ts.map