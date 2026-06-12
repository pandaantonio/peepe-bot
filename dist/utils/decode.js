"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Decode {
    toBase64(text) {
        try {
            return Buffer.from(text, 'base64').toString('utf-8');
        }
        catch (e) {
            return text;
        }
    }
    toBinary(text) {
        try {
            return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        }
        catch (e) {
            return text;
        }
    }
}
exports.default = Decode;
;
