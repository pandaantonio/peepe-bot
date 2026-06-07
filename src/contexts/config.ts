import EphemeralOption from "@/options/EphemeralOption";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ApplicationIntegrationTypes, CreateApplicationCommandOptions, EntryPointCommandHandlerTypes, InteractionContextTypes } from "oceanic.js";

const command: CreateApplicationCommandOptions = {
    type: 1,
    name: "config",
    description: "Configurações do servidor",
    dmPermission: false,
    defaultMemberPermissions: "32",
    options: [
        {
            type: 1,
            name: "anti-invite",
            description: "Configure o bloqueio de convites",
            options: [
                {
                    type: 5, // Boolean
                    name: "enabled",
                    description: "Ativar ou desativar o sistema",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "anti-link",
            description: "Configure o bloqueio de links",
            options: [
                {
                    type: 5, // Boolean
                    name: "enabled",
                    description: "Ativar ou desativar o sistema",
                    required: true
                }
            ]
        }
    ]
};

export default command;