import { CreateApplicationCommandOptions } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
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

export default command;