import { ApplicationCommandTypes, CreateApplicationCommandOptions, EntryPointCommandHandlerTypes } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    name: "launch",
    nameLocalizations: {
        "pt-BR": "Abrir atividade",
    },
    handler: EntryPointCommandHandlerTypes.DISCORD_LAUNCH_ACTIVITY,
    type: ApplicationCommandTypes.PRIMARY_ENTRY_POINT,
};

export default command;