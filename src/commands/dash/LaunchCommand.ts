import Command from "@/struct/command";
import { ApplicationCommandTypes, EntryPointCommandHandlerTypes } from "oceanic.js";

export default new Command().setCommand({
    name: "launch",
    nameLocalizations: {
        "pt-BR": "Abrir atividade",
    },
    handler: EntryPointCommandHandlerTypes.DISCORD_LAUNCH_ACTIVITY,
    type: ApplicationCommandTypes.PRIMARY_ENTRY_POINT,
});