import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, CreateApplicationCommandOptions, EntryPointCommandHandlerTypes, InteractionContextTypes } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: 'user',
    nameLocalizations: {
        "pt-BR": "usuário"
    },
    description: "Null",
    options: [{
        type: 1,
        name: "avatar",
        description: "See a user avatar.",
        descriptionLocalizations: {
            "pt-BR": "Veja o avatar do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
    }, {
        type: 1,
        name: "banner",
        nameLocalizations: {
            "pt-BR": "estandarte"
        },
        description: "See a user banner.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
    }],
    integrationTypes: [
        ApplicationIntegrationTypes.GUILD_INSTALL,
        ApplicationIntegrationTypes.USER_INSTALL,
    ],
    contexts: [
        InteractionContextTypes.BOT_DM,
        InteractionContextTypes.GUILD,
        InteractionContextTypes.PRIVATE_CHANNEL,
    ],
}

export default command;