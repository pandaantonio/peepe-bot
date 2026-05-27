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
        name: "2048",
        description: "Play the classic 2048 puzzle game",
        descriptionLocalizations: {
            "pt-BR": "Jogue o clássico jogo de quebra-cabeça 2048"
        },
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "snake",
        nameLocalizations: {
            "pt-BR": "cobrinha"
        },
        description: "Play the classic Snake game",
        descriptionLocalizations: {
            "pt-BR": "Jogue o clássico jogo da cobrinha"
        },
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
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