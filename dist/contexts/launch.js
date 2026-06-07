"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command = {
    name: "launch",
    nameLocalizations: {
        "pt-BR": "Abrir atividade",
    },
    handler: oceanic_js_1.EntryPointCommandHandlerTypes.DISCORD_LAUNCH_ACTIVITY,
    type: oceanic_js_1.ApplicationCommandTypes.PRIMARY_ENTRY_POINT,
};
exports.default = command;
