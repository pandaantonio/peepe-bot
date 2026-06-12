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
    name: "encode",
    nameLocalizations: {
        "pt-BR": "codificar"
    },
    description: "Encode a text into different formats.",
    descriptionLocalizations: {
        "pt-BR": "Codifique um texto para diferentes formatos."
    },
    options: [{
            type: 1,
            name: "base64",
            description: "Encode a text to Base64.",
            descriptionLocalizations: {
                "pt-BR": "Codifica um texto em Base64."
            },
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "morse",
            description: "Encode a text to Morse code.",
            descriptionLocalizations: {
                "pt-BR": "Codifica um texto em código Morse."
            },
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "binary",
            description: "Encode a text to binary code.",
            descriptionLocalizations: {
                "pt-BR": "Codifica um texto em código binário."
            },
            options: [(0, TextOption_1.default)(true), (0, EphemeralOption_1.default)(false)],
        }],
});
