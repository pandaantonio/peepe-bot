import { ApplicationCommandOptionsSubCommand, ApplicationCommandTypes } from "oceanic.js";
import Command from "../../app/command";
import createEmbed from "./create-embed";

export default new Command().setCommand({
    name: "config",
    description: "Null",
    options: [
        createEmbed.subcommand as ApplicationCommandOptionsSubCommand,
    ],
    dmPermission: false,
    type: ApplicationCommandTypes.CHAT_INPUT,
});