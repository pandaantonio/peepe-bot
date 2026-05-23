"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    name: "config",
    nameLocalizations: {
        "pt-BR": "configurar"
    },
    description: "Server configuration commands.",
    descriptionLocalizations: {
        "pt-BR": "Comandos de configuração do servidor."
    },
    options: [{
            type: 1,
            name: "msg",
            description: "Create and manage embedded messages.",
            descriptionLocalizations: {
                "pt-BR": "Crie e gerencie mensagens incorporadas."
            },
        }],
    dmPermission: false,
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
