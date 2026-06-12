"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    type: 1,
    name: "emoji",
    description: "Null",
    options: [{
            type: 1,
            name: "view",
            nameLocalizations: {
                "pt-BR": "ver"
            },
            description: "View or download any emoji.",
            descriptionLocalizations: {
                "pt-BR": "Visualize ou baixe qualquer emoji."
            },
            options: [{
                    type: 3,
                    required: true,
                    name: "emoji",
                    description: "The Emoji",
                    descriptionLocalizations: {
                        "pt-BR": "O Emoji."
                    },
                }],
        }, {
            type: 1,
            name: "info",
            description: "Get information about any emoji.",
            descriptionLocalizations: {
                "pt-BR": "Obtenha informações sobre qualquer emoji."
            },
            options: [{
                    type: 3,
                    required: true,
                    name: "emoji",
                    description: "The Emoji",
                    descriptionLocalizations: {
                        "pt-BR": "O Emoji."
                    },
                }],
        }],
});
