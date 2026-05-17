import { ApplicationCommandOptionsBoolean, ApplicationCommandOptionTypes } from "oceanic.js";

export default function EphemeralOption(required: boolean): ApplicationCommandOptionsBoolean {
    return {
        required,
        name: "ephemeral",
        nameLocalizations: {
            "pt-BR": "efemera"
        },
        description: "Yes?",
        descriptionLocalizations: {
            "pt-BR": "Sim?"
        },
        type: ApplicationCommandOptionTypes.BOOLEAN,
    }
};