"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesiredPort = void 0;
const net_1 = __importDefault(require("net"));
const getAvailablePort = (portToTry) => new Promise((resolve, reject) => {
    const server = net_1.default.createServer();
    server.unref();
    server.on('error', reject);
    server.listen({ port: portToTry }, () => {
        const { port } = server.address();
        server.close(() => {
            resolve(port);
        });
    });
});
const portCheckSequence = function* (ports) {
    if (ports) {
        yield* ports;
    }
    yield 0; // Fall back to 0 if anything else failed
};
const isPortAvailable = async (port) => {
    try {
        await getAvailablePort(port);
        return true;
    }
    catch (error) {
        if (!['EADDRINUSE', 'EACCES'].includes(error.code)) {
            throw error;
        }
        return false;
    }
};
const getPort = async (from, to) => {
    const ports = makeRange(from, to);
    for (const port of portCheckSequence(ports)) {
        if (await isPortAvailable(port)) {
            return port;
        }
    }
    throw new Error('No available ports found');
};
const getDesiredPort = async (desiredPort, from, to) => {
    if (typeof desiredPort !== 'undefined' &&
        (await isPortAvailable(desiredPort))) {
        return desiredPort;
    }
    const actualPort = await getPort(from, to);
    // If did specify a port but did not get that one, fail hard.
    if (desiredPort && desiredPort !== actualPort) {
        throw new Error(`You specified port ${desiredPort} to be used for the HTTP server, but it is not available. Choose a different port or remove the setting to let Remotion automatically select a free port.`);
    }
    return actualPort;
};
exports.getDesiredPort = getDesiredPort;
const makeRange = (from, to) => {
    if (!Number.isInteger(from) || !Number.isInteger(to)) {
        throw new TypeError('`from` and `to` must be integer numbers');
    }
    if (from < 1024 || from > 65535) {
        throw new RangeError('`from` must be between 1024 and 65535');
    }
    if (to < 1024 || to > 65536) {
        throw new RangeError('`to` must be between 1024 and 65536');
    }
    if (to < from) {
        throw new RangeError('`to` must be greater than or equal to `from`');
    }
    const generator = function* (f, t) {
        for (let port = f; port <= t; port++) {
            yield port;
        }
    };
    return generator(from, to);
};
//# sourceMappingURL=get-port.js.map