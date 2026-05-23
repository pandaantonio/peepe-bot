import { ApplicationCommandTypes } from "oceanic.js";
import Command from "@/struct/command";

export default new Command().setCommand({
    name: "config",
    description: "Null",
    options: [{
        type: 1,
        name: "embed",
        nameLocalizations: {
            "pt-BR": "incorporação"
        },
        description: "Create embedded messages.",
        descriptionLocalizations: {
            "pt-BR": "Crie mensagens incorporadas."
        },
    }],
    dmPermission: false,
    type: ApplicationCommandTypes.CHAT_INPUT,
});