import { CreateApplicationCommandOptions } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: "nuke",
    description: "It clones the current channel and removes the original, deleting all message history..",
    descriptionLocalizations: {
        "pt-BR": "Ele clona o canal atual e remove o original, apagando todo o histórico de mensagens.."
    },
    dmPermission: false,
    defaultMemberPermissions: "16",
};

export default command;