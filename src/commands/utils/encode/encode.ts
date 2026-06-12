import EphemeralOption from "@/options/EphemeralOption";
import TextOption from "@/options/TextOption";
import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "encode",
    nameLocalizations: {
        "pt-BR": "codificar"
    },
    description: "Encode a text into different formats.",
    descriptionLocalizations: {
        "pt-BR": "Codifique um texto para diferentes formatos."
    },
    options: [{
        type: 1,
        name: "base64",
        description: "Encode a text to Base64.",
        descriptionLocalizations: {
            "pt-BR": "Codifica um texto em Base64."
        },
        options: [TextOption(true), EphemeralOption(false)],
    }, {
        type: 1,
        name: "morse",
        description: "Encode a text to Morse code.",
        descriptionLocalizations: {
            "pt-BR": "Codifica um texto em código Morse."
        },
        options: [TextOption(true), EphemeralOption(false)],
    }, {
        type: 1,
        name: "binary",
        description: "Encode a text to binary code.",
        descriptionLocalizations: {
            "pt-BR": "Codifica um texto em código binário."
        },
        options: [TextOption(true), EphemeralOption(false)],
    }],
});