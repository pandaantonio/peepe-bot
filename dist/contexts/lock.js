"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    type: 1,
    name: "lock",
    description: "Null",
    dmPermission: false,
    defaultMemberPermissions: "16",
    options: [{
            type: 1,
            name: "add",
            description: "Block channel from receiving new messages from regular members.",
            descriptionLocalizations: {
                "pt-BR": "Impedir que o canal receba novas mensagens de membros regulares."
            },
        }, {
            type: 1,
            name: "remove",
            description: "Unlock channel so regular members can post messages.",
            descriptionLocalizations: {
                "pt-BR": "Desbloqueie o canal para que membros regulares possam postar mensagens."
            },
        }],
};
exports.default = command;
