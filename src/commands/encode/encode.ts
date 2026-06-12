import EphemeralOption from "@/options/EphemeralOption";
import TextOption from "@/options/TextOption";
import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "encode",
    nameLocalizations: {
        "pt-BR": "codificar"
    },
    description: "Null",
    options: [{
        type: 1,
        name: "base64",
        description: "null",
        options: [TextOption(true), EphemeralOption(false)],
    }, {
        type: 1,
        name: "morse",
        description: "null",
        options: [TextOption(true), EphemeralOption(false)],
    }, {
        type: 1,
        name: "binary",
        description: "null",
        options: [TextOption(true), EphemeralOption(false)],
    }],
});