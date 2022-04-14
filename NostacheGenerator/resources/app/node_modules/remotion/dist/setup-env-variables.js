"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEnvVariables = exports.ENV_VARIABLES_ENV_NAME = exports.ENV_VARIABLES_LOCAL_STORAGE_KEY = void 0;
const get_environment_1 = require("./get-environment");
exports.ENV_VARIABLES_LOCAL_STORAGE_KEY = 'remotion.envVariables';
exports.ENV_VARIABLES_ENV_NAME = 'ENV_VARIABLES';
const getEnvVariables = () => {
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
        const param = localStorage.getItem(exports.ENV_VARIABLES_LOCAL_STORAGE_KEY);
        if (!param) {
            return {};
        }
        return { ...JSON.parse(param), NODE_ENV: process.env.NODE_ENV };
    }
    if ((0, get_environment_1.getRemotionEnvironment)() === 'preview') {
        // Webpack will convert this to an object at compile time.
        // Don't convert this syntax to a computed property.
        return {
            ...process.env.ENV_VARIABLES,
            NODE_ENV: process.env.NODE_ENV,
        };
    }
    throw new Error('Can only call getEnvVariables() if environment is `rendering` or `preview`');
};
const setupEnvVariables = () => {
    const env = getEnvVariables();
    if (!window.process) {
        window.process = {};
    }
    if (!window.process.env) {
        window.process.env = {};
    }
    Object.keys(env).forEach((key) => {
        window.process.env[key] = env[key];
    });
};
exports.setupEnvVariables = setupEnvVariables;
//# sourceMappingURL=setup-env-variables.js.map