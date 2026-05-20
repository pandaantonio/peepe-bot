"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            name: "2048",
            description: "Combine numbers to reach 2048!",
            descriptionLocalizations: {
                "pt-BR": "Combine números e chegue a 2048!"
            },
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
        }],
});
