/// <reference types="node" />
import puppeteer from 'puppeteer-core';
import { ImageFormat } from 'remotion';
export declare const screenshotDOMElement: ({ page, imageFormat, quality, opts, }: {
    page: puppeteer.Page;
    imageFormat: ImageFormat;
    quality: number | undefined;
    opts?: {
        path?: string | undefined;
        selector?: string | undefined;
    } | undefined;
}) => Promise<Buffer>;
//# sourceMappingURL=screenshot-dom-element.d.ts.map