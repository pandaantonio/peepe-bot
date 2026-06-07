import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import { CreateApplicationCommandOptions } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: 'member',
    nameLocalizations: {
        "pt-BR": "membro"
    },
    description: "Null",
    dmPermission: false,
    options: [{
        type: 1,
        name: "avatar",
        description: "See a user avatar.",
        descriptionLocalizations: {
            "pt-BR": "Veja o avatar do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
    }, {
        type: 1,
        name: "banner",
        nameLocalizations: {
            "pt-BR": "estandarte"
        },
        description: "See a user banner.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
    }],
}

export default command;