import { ApplicationCommandOptionsSubCommand, ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes } from "oceanic.js";
import Command from "../../app/command";
import emoji from "./emoji-view";
import emojiInfo from "./emoji-info";

export default new Command().setCommand({
    name: "emoji",
    description: "Null",
    options: [
        emoji.subcommand as ApplicationCommandOptionsSubCommand,
        emojiInfo.subcommand as ApplicationCommandOptionsSubCommand,
    ],
    contexts: [
        InteractionContextTypes.BOT_DM,
        InteractionContextTypes.GUILD,
        InteractionContextTypes.PRIVATE_CHANNEL,
    ],
    integrationTypes: [
        ApplicationIntegrationTypes.GUILD_INSTALL,
        ApplicationIntegrationTypes.USER_INSTALL,
    ],
    type: ApplicationCommandTypes.CHAT_INPUT,
});