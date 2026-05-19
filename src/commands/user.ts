import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "oceanic.js";
import Command from "../app/command";
import UserOption from "../options/UserOption";
import EphemeralOption from "../options/EphemeralOption";

export default new Command()
    .setCommand({
        name: "user",
        nameLocalizations: {
            "pt-BR": "usuário"
        },
        description: "User utilities and information",
        descriptionLocalizations: {
            "pt-BR": "Utilidades e informações de usuários"
        },
        options: [{
            name: "avatar",
            description: "View a user's avatar",
            descriptionLocalizations: {
                "pt-BR": "Veja o avatar de um usuário"
            },
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [UserOption(false), EphemeralOption(false)],
        }, {
            name: "banner",
            nameLocalizations: {
                "pt-BR": "estandarte"
            },
            description: "View a user's banner",
            descriptionLocalizations: {
                "pt-BR": "Veja o estandarte de um usuário"
            },
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [UserOption(false), EphemeralOption(false)],
        },{
            name: "info",
            description: "View information about a user",
            descriptionLocalizations: {
                "pt-BR": "Veja informações sobre um usuário"
            },
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [UserOption(false), EphemeralOption(false)],
        }],
        type: ApplicationCommandTypes.CHAT_INPUT,
    });