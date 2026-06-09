import EphemeralOption from "@/options/EphemeralOption";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ApplicationIntegrationTypes, CreateApplicationCommandOptions, EntryPointCommandHandlerTypes, InteractionContextTypes } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
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
        description: "See a server splash.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte de convite do servidor."
        },
        options: [EphemeralOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        type: 1,
        name: "info",
        description: "Access server information.",
        descriptionLocalizations: {
            "pt-BR": "Acessar informações do servidor."
        },
        options: [EphemeralOption(false)],
    }],
    type: ApplicationCommandTypes.CHAT_INPUT,
};

export default command;