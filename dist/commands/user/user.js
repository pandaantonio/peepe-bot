"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
const UserOption_1 = __importDefault(require("../../options/UserOption"));
const EphemeralOption_1 = __importDefault(require("../../options/EphemeralOption"));
exports.default = new command_1.default()
    .setCommand({
    name: "user",
    nameLocalizations: {
        "pt-BR": "usuário"
    },
    description: "User utilities and information",
    descriptionLocalizations: {
        "pt-BR": "Utilidades e informações de usuários"
    },
    options: [{
            name: "avatar",
            description: "View a user's avatar",
            descriptionLocalizations: {
                "pt-BR": "Veja o avatar de um usuário"
            },
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }, {
            name: "banner",
            nameLocalizations: {
                "pt-BR": "estandarte"
            },
            description: "View a user's banner",
            descriptionLocalizations: {
                "pt-BR": "Veja o estandarte de um usuário"
            },
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }, {
            name: "info",
            description: "View information about a user",
            descriptionLocalizations: {
                "pt-BR": "Veja informações sobre um usuário"
            },
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }],
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
