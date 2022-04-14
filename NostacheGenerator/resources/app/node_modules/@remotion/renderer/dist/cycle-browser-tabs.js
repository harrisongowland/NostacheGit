"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cycleBrowserTabs = void 0;
const cycleBrowserTabs = (openedBrowser) => {
    let i = 0;
    const interval = setInterval(() => {
        openedBrowser
            .pages()
            .then((pages) => {
            const currentPage = pages[i % pages.length];
            i++;
            if (!currentPage.isClosed()) {
                currentPage.bringToFront();
            }
        })
            .catch((err) => console.log(err));
    }, 100);
    return {
        stopCycling: () => clearInterval(interval),
    };
};
exports.cycleBrowserTabs = cycleBrowserTabs;
//# sourceMappingURL=cycle-browser-tabs.js.map