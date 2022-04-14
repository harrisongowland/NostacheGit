"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNonce = exports.NonceContext = void 0;
const react_1 = require("react");
exports.NonceContext = (0, react_1.createContext)({
    getNonce: () => 0,
    fastRefreshes: 0,
});
const useNonce = () => {
    const context = (0, react_1.useContext)(exports.NonceContext);
    const [nonce, setNonce] = (0, react_1.useState)(() => context.getNonce());
    (0, react_1.useEffect)(() => {
        setNonce(context.getNonce);
    }, [context]);
    return nonce;
};
exports.useNonce = useNonce;
//# sourceMappingURL=nonce.js.map