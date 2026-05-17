import { ApplicationCommandOptionsUser, ApplicationCommandOptionTypes } from "oceanic.js";

export default function UserOption(required: boolean): ApplicationCommandOptionsUser {
    return {
        required,
        name: "user",
        nameLocalizations: {
            "pt-BR": "usuário"
        },
        description: "Choose a user.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um usuário."
        },
        type: ApplicationCommandOptionTypes.USER,
    };
};