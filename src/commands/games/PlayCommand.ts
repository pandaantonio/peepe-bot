import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import Command from "@/struct/command";
import {
    ApplicationCommandOptionTypes,
    ApplicationCommandTypes,
    ApplicationIntegrationTypes,
    InteractionContextTypes
} from "oceanic.js";

export default new Command().setCommand({
    name: "play",
    nameLocalizations: {
        "pt-BR": "jogar"
    },
    description: "Null",
    options: [{
        name: "gn",
        nameLocalizations: {
            "pt-BR": "an"
        },
        description: "Try to guess the secret number",
        descriptionLocalizations: {
            "pt-BR": "Tente adivinhar o número secreto"
        },
        options: [EphemeralOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "ttt",
        nameLocalizations: {
            "pt-BR": "velha"
        },
        description: "Align three symbols to win.",
        descriptionLocalizations: {
            "pt-BR": "Alinhe três símbolos para vencer."
        },
        options: [UserOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
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
    type: ApplicationCommandTypes.CHAT_INPUT,
});