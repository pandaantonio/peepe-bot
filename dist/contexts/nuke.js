"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    type: 1,
    name: "nuke",
    description: "It clones the current channel and removes the original, deleting all message history..",
    descriptionLocalizations: {
        "pt-BR": "Ele clona o canal atual e remove o original, apagando todo o histórico de mensagens.."
    },
    dmPermission: false,
    defaultMemberPermissions: "16",
};
exports.default = command;
