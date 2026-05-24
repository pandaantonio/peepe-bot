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
        options: [{
            minValue: 1,
            maxValue: 100,
            required: true,
            name: "chosen-number",
            nameLocalizations: {
                "pt-BR": "número-escolhido"
            },
            description: "Choose a number from 1 to 100.",
            descriptionLocalizations: {
                "pt-BR": "Escolha um número de 1 a 100."
            },
            type: ApplicationCommandOptionTypes.INTEGER,
        }],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "2048",
        description: "Combine numbers to reach 2048!",
        descriptionLocalizations: {
            "pt-BR": "Combine números e chegue a 2048!"
        },
        options: [EphemeralOption(false)],
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "snake",
        nameLocalizations: {
            "pt-BR": "cobrinha"
        },
        description: "Feed the snake and avoid obstacles to score!",
        descriptionLocalizations: {
            "pt-BR": "Alimente a cobra e evite obstáculos para pontuar!"
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