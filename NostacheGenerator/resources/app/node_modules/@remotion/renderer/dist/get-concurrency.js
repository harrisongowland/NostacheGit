"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualConcurrency = void 0;
const os_1 = __importDefault(require("os"));
const getActualConcurrency = (userPreference) => {
    if (userPreference === null) {
        return Math.round(Math.min(8, Math.max(1, os_1.default.cpus().length / 2)));
    }
    const rounded = Math.floor(userPreference);
    const max = os_1.default.cpus().length;
    const min = 1;
    if (rounded > max) {
        throw new Error(`Maximum for --concurrency is ${max} (number of cores on this system)`);
    }
    if (rounded < min) {
        throw new Error(`Minimum for concurrency is ${min}.`);
    }
    return rounded;
};
exports.getActualConcurrency = getActualConcurrency;
//# sourceMappingURL=get-concurrency.js.map