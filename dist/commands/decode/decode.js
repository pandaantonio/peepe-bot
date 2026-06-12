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
    description: "Decode a text from different formats.",
    descriptionLocalizations: {
        "pt-BR": "Decodifique um texto de diferentes formatos."
    },
    options: [{
            type: 1,
            name: "base64",
            description: "Decode a Base64 string back to text.",
            descriptionLocalizations: {
                "pt-BR": "Decodifica um texto em Base64 para texto normal."
            },
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "morse",
            description: "Decode Morse code back to text.",
            descriptionLocalizations: {
                "pt-BR": "Decodifica um código Morse para texto normal."
            },
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "binary",
            description: "Decode binary code back to text.",
            descriptionLocalizations: {
                "pt-BR": "Decodifica um código binário para texto normal."
            },
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }],
});
