"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEX_REGEX = void 0;
exports.default = hexToDecimal;
exports.HEX_REGEX = /^#?([a-fA-F0-9]{6})$/;
function hexToDecimal(hexCor) {
    hexCor = hexCor.replace("#", "");
    const r = parseInt(hexCor.slice(0, 2), 16);
    const g = parseInt(hexCor.slice(2, 4), 16);
    const b = parseInt(hexCor.slice(4, 6), 16);
    return (r * 256 ** 2) + (g * 256) + b;
}
