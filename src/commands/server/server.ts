import EphemeralOption from "@/options/EphemeralOption";
import Command from "@/struct/command";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "oceanic.js";

export default new Command().setCommand({
    name: "server",
    nameLocalizations: {
        "pt-BR": "servidor"
    },
    description: "Null",
    dmPermission: false,
    options: [{
        name: "icon",
        nameLocalizations: {
            "pt-BR": "ícone"
        },
        description: "See a server icon.",
        descriptionLocalizations: {
            "pt-BR": "Veja o ícone do servidor."
        },
        options: [EphemeralOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "banner",
        nameLocalizations: {
            "pt-BR": "estandarte"
        },
        description: "See a server banner.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte do servidor."
        },
        options: [EphemeralOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "splash",
        nameLocalizations: {
            "pt-BR": "estandarte-de-convite"
        },
        description: "See a server splash.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte de convite do servidor."
        },
        options: [EphemeralOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }],
    type: ApplicationCommandTypes.CHAT_INPUT,
});