"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default().setCommand({
    name: "config",
    description: "Null",
    options: [{
            type: 1,
            name: "embed",
            nameLocalizations: {
                "pt-BR": "incorporação"
            },
            description: "Create embedded messages.",
            descriptionLocalizations: {
                "pt-BR": "Crie mensagens incorporadas."
            },
        }],
    dmPermission: false,
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
