"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decimalToHex;
function decimalToHex(decimalCor) {
    const r = (decimalCor >> 16) & 0xff;
    const g = (decimalCor >> 8) & 0xff;
    const b = decimalCor & 0xff;
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");
    return `#${hexR}${hexG}${hexB}`;
}
