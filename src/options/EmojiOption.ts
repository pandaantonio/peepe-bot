import { ApplicationCommandOptionsString, ApplicationCommandOptionTypes } from "oceanic.js";

export default function EmojiOption(required: boolean): ApplicationCommandOptionsString {
    return {
        required,
        name: "emoji",
        description: "Choose a emoji.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um emoji."
        },
        type: ApplicationCommandOptionTypes.STRING,
    };
};