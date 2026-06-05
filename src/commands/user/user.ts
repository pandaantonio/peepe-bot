import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import Command from "@/struct/command";
import { ApplicationIntegrationTypes, InteractionContextTypes } from "oceanic.js";

export default new Command().setCommand({
    type: 1,
    name: 'user',
    description: "Null",
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
    integrationTypes: [
        ApplicationIntegrationTypes.GUILD_INSTALL,
        ApplicationIntegrationTypes.USER_INSTALL,
    ],
    contexts: [
        InteractionContextTypes.BOT_DM,
        InteractionContextTypes.GUILD,
        InteractionContextTypes.PRIVATE_CHANNEL,
    ],
});