import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "oceanic.js";
import Command from "../../app/command";
import UserOption from "../../options/UserOption";
import EphemeralOption from "../../options/EphemeralOption";

export default new Command()
    .setCommand({
        name: "member",
        nameLocalizations: {
            "pt-BR": "membro"
        },
        description: "Member utilities and information",
        descriptionLocalizations: {
            "pt-BR": "Utilidades e informações de membros"
        },
        dmPermission: false,
        options: [{
            name: "avatar",
            description: "Display a member's avatar",
            descriptionLocalizations: {
                "pt-BR": "Exibe o avatar de um membro"
            },
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [UserOption(false), EphemeralOption(false)],
        }, {
            name: "banner",
            nameLocalizations: {
                "pt-BR": "estandarte"
            },
            description: "Display a member's profile banner",
            descriptionLocalizations: {
                "pt-BR": "Exibe o banner de perfil de um membro"
            },
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [UserOption(false), EphemeralOption(false)],
        }, {
            name: "info",
            description: "Display information about a member",
            descriptionLocalizations: {
                "pt-BR": "Exibe informações sobre um membro"
            },
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [UserOption(false), EphemeralOption(false)],
        }],
        type: ApplicationCommandTypes.CHAT_INPUT,
    });