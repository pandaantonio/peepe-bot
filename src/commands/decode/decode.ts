import EphemeralOption from "@/options/EphemeralOption";
import TextOption from "@/options/TextOption";
import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "decode",
    nameLocalizations: {
        "pt-BR": "decodificar"
    },
    description: "Decode a text from different formats.",
    descriptionLocalizations: {
        "pt-BR": "Decodifique um texto de diferentes formatos."
    },
    options: [{
        type: 1,
        name: "base64",
        description: "Decode a Base64 string back to text.",
        descriptionLocalizations: {
            "pt-BR": "Decodifica um texto em Base64 para texto normal."
        },
        options: [TextOption(true), EphemeralOption(false)],
    }, {
        type: 1,
        name: "morse",
        description: "Decode Morse code back to text.",
        descriptionLocalizations: {
            "pt-BR": "Decodifica um código Morse para texto normal."
        },
        options: [TextOption(true), EphemeralOption(false)],
    }, {
        type: 1,
        name: "binary",
        description: "Decode binary code back to text.",
        descriptionLocalizations: {
            "pt-BR": "Decodifica um código binário para texto normal."
        },
        options: [TextOption(true), EphemeralOption(false)],
    }],
});