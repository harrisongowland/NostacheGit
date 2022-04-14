"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMultipleRemotionVersions = void 0;
const checkMultipleRemotionVersions = () => {
    if (typeof window === 'undefined') {
        return;
    }
    if (window.remotion_imported) {
        console.error('🚨 Multiple versions of Remotion detected. Multiple versions will cause conflicting React contexts and things may break in an unexpected way. Please check your dependency tree and make sure only one version of Remotion is on the page.');
    }
    window.remotion_imported = true;
};
exports.checkMultipleRemotionVersions = checkMultipleRemotionVersions;
//# sourceMappingURL=multiple-versions-warning.js.map