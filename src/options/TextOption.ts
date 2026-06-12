import { ApplicationCommandOptionsString, ApplicationCommandOptionTypes } from "oceanic.js";

export default function TextOption(required: boolean): ApplicationCommandOptionsString {
    return {
        required,
        name: "text",
        nameLocalizations: {
            "pt-BR": "texto"
        },
        description: "Enter the required text.",
        descriptionLocalizations: {
            "pt-BR": "Digite o texto necessário."
        },
        type: ApplicationCommandOptionTypes.STRING,
    }
};