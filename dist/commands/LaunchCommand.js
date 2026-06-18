"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default().setCommand({
    name: "launch",
    nameLocalizations: {
        "pt-BR": "Abrir atividade",
    },
    handler: oceanic_js_1.EntryPointCommandHandlerTypes.DISCORD_LAUNCH_ACTIVITY,
    type: oceanic_js_1.ApplicationCommandTypes.PRIMARY_ENTRY_POINT,
});
