"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const TextOption_1 = __importDefault(require("@/options/TextOption"));
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    type: 1,
    name: "decode",
    nameLocalizations: {
        "pt-BR": "decodificar"
    },
    description: "Null",
    options: [{
            type: 1,
            name: "base64",
            description: "null",
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "morse",
            description: "null",
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "binary",
            description: "null",
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }],
});
