"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const UserOption_1 = __importDefault(require("@/options/UserOption"));
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    type: 1,
    name: "play",
    nameLocalizations: {
        "pt-BR": "jogar"
    },
    description: "Null",
    options: [{
            type: 1,
            name: "gn",
            nameLocalizations: {
                "pt-BR": "an"
            },
            description: "Try to guess the secret number",
            descriptionLocalizations: {
                "pt-BR": "Tente adivinhar o número secreto"
            },
            options: [{
                    type: 4,
                    minValue: 1,
                    maxValue: 100,
                    required: true,
                    name: "chosen-number",
                    nameLocalizations: {
                        "pt-BR": "número-escolhido"
                    },
                    description: "Choose a number from 1 to 100.",
                    descriptionLocalizations: {
                        "pt-BR": "Escolha um número de 1 a 100."
                    }
                }],
        }, {
            type: 1,
            name: "2048",
            description: "Combine numbers to reach 2048!",
            descriptionLocalizations: {
                "pt-BR": "Combine números e chegue a 2048!"
            },
            options: [(0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "snake",
            nameLocalizations: {
                "pt-BR": "cobrinha"
            },
            description: "Feed the snake and avoid obstacles to score!",
            descriptionLocalizations: {
                "pt-BR": "Alimente a cobra e evite obstáculos para pontuar!"
            },
            options: [(0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "ttt",
            nameLocalizations: {
                "pt-BR": "velha"
            },
            description: "Align three symbols to win.",
            descriptionLocalizations: {
                "pt-BR": "Alinhe três símbolos para vencer."
            },
            options: [(0, UserOption_1.default)(false)],
        }],
});
