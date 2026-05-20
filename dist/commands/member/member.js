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
    name: "member",
    nameLocalizations: {
        "pt-BR": "membro"
    },
    description: "Member utilities and information",
    descriptionLocalizations: {
        "pt-BR": "Utilidades e informações de membros"
    },
    dmPermission: false,
    options: [{
            name: "avatar",
            description: "Display a member's avatar",
            descriptionLocalizations: {
                "pt-BR": "Exibe o avatar de um membro"
            },
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }, {
            name: "banner",
            nameLocalizations: {
                "pt-BR": "estandarte"
            },
            description: "Display a member's profile banner",
            descriptionLocalizations: {
                "pt-BR": "Exibe o banner de perfil de um membro"
            },
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }, {
            name: "info",
            description: "Display information about a member",
            descriptionLocalizations: {
                "pt-BR": "Exibe informações sobre um membro"
            },
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }],
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
