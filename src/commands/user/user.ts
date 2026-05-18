import { ApplicationCommandOptionsSubCommand } from "oceanic.js";
import Command from "../../app/command";
import userAvatar from "./user-avatar";
import userBanner from "./user-banner";
import userInfo from "./user-info";

export default new Command().setCommand({
    type: 1,
    name: "user",
    nameLocalizations: {
        "pt-BR": "usuário"
    },
    description: "Null",
    options: [
        userAvatar.subcommand as ApplicationCommandOptionsSubCommand,
        userBanner.subcommand as ApplicationCommandOptionsSubCommand,
        userInfo.subcommand as ApplicationCommandOptionsSubCommand,
    ],
});