import { ApplicationCommandTypes } from "oceanic.js";
import Command from "@/struct/command";

export default new Command().setCommand({
    name: "config",
    description: "Server configuration commands.",
    descriptionLocalizations: {
        "pt-BR": "Comandos de configuração do servidor."
    },
    options: [{
        type: 1,
        name: "msg",
        description: "Create and manage embedded messages.",
        descriptionLocalizations: {
            "pt-BR": "Crie e gerencie mensagens incorporadas."
        },
    }],
    dmPermission: false,
    type: ApplicationCommandTypes.CHAT_INPUT,
});