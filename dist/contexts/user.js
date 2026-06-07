"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const UserOption_1 = __importDefault(require("@/options/UserOption"));
const oceanic_js_1 = require("oceanic.js");
const command = {
    type: 1,
    name: 'user',
    nameLocalizations: {
        "pt-BR": "usuário"
    },
    description: "Null",
    options: [{
            type: 1,
            name: "avatar",
            description: "See a user avatar.",
            descriptionLocalizations: {
                "pt-BR": "Veja o avatar do usuário."
            },
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
        }, {
            type: 1,
            name: "banner",
            nameLocalizations: {
                "pt-BR": "estandarte"
            },
            description: "See a user banner.",
            descriptionLocalizations: {
                "pt-BR": "Veja o estandarte do usuário."
            },
            options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
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
};
exports.default = command;
