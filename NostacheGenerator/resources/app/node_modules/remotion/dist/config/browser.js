"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowser = exports.setBrowser = exports.DEFAULT_BROWSER = void 0;
exports.DEFAULT_BROWSER = 'chrome';
let currentBrowser = null;
const setBrowser = (browser) => {
    if (browser === 'chrome') {
        process.env.PUPPETEER_PRODUCT = 'chrome';
    }
    if (browser === 'firefox') {
        process.env.PUPPETEER_PRODUCT = 'firefox';
    }
    currentBrowser = browser;
};
exports.setBrowser = setBrowser;
const getBrowser = () => {
    return currentBrowser;
};
exports.getBrowser = getBrowser;
//# sourceMappingURL=browser.js.map