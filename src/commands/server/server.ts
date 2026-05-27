import Command from "@/struct/command";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "oceanic.js";

export default new Command().setCommand({
    name: "server",
    description: "Null",
    dmPermission: false,
    options: [{
        name: "icon",
        description: "See a server icon.",
        descriptionLocalizations: {
            "pt-BR": "Veja o ícone do servidor."
        },
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "banner",
        description: "See a server banner.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte do servidor."
        },
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }, {
        name: "splash",
        description: "See a server splash.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte de convite do servidor."
        },
        type: ApplicationCommandOptionTypes.SUB_COMMAND,
    }],
    type: ApplicationCommandTypes.CHAT_INPUT,
});