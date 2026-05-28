"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default().setCommand({
    name: "server",
    description: "Null",
    dmPermission: false,
    options: [{
            name: "icon",
            description: "See a server icon.",
            descriptionLocalizations: {
                "pt-BR": "Veja o ícone do servidor."
            },
            options: [(0, EphemeralOption_1.default)(false)],
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
        }, {
            name: "banner",
            description: "See a server banner.",
            descriptionLocalizations: {
                "pt-BR": "Veja o estandarte do servidor."
            },
            options: [(0, EphemeralOption_1.default)(false)],
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
        }, {
            name: "splash",
            description: "See a server splash.",
            descriptionLocalizations: {
                "pt-BR": "Veja o estandarte de convite do servidor."
            },
            options: [(0, EphemeralOption_1.default)(false)],
            type: oceanic_js_1.ApplicationCommandOptionTypes.SUB_COMMAND,
        }],
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
