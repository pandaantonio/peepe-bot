"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const UserOption_1 = __importDefault(require("@/options/UserOption"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default().setCommand({
    name: "play",
    nameLocalizations: {
        "pt-BR": "jogar"
    },
    description: "Null",
    options: [{
            name: "gn",
            nameLocalizations: {
                "pt-BR": "an"
            },
            description: "Try to guess the secret number",
            descriptionLocalizations: {
                "pt-BR": "Tente adivinhar o número secreto"
            },
            options: [(0, EphemeralOption_1.default)(false)],
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
        }, {
            name: "ttt",
            nameLocalizations: {
                "pt-BR": "velha"
            },
            description: "Align three symbols to win.",
            descriptionLocalizations: {
                "pt-BR": "Alinhe três símbolos para vencer."
            },
            options: [(0, UserOption_1.default)(false)],
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
        }],
    integrationTypes: [
        oceanic_js_1.ApplicationIntegrationTypes.GUILD_INSTALL,
        oceanic_js_1.ApplicationIntegrationTypes.USER_INSTALL,
    ],
    contexts: [
        oceanic_js_1.InteractionContextTypes.BOT_DM,
        oceanic_js_1.InteractionContextTypes.GUILD,
        oceanic_js_1.InteractionContextTypes.PRIVATE_CHANNEL,
    ],
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
