import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import Command from "@/struct/command";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .setRun(async function({ app, author, interaction }){
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const url = user.avatarURL();

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${user.globalName ?? user.username}**`,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url,
                        },
                    }],
                }],
            }, {
                type: 1,
                components: [{
                    url,
                    type: 2,
                    style: 5,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }],
            }],
        });
    })

    .setCommand({
        name: "avatar",
        description: "See a user avatar.",
        descriptionLocalizations: {
            "pt-BR": "Veja o avatar do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
        integrationTypes: [
            ApplicationIntegrationTypes.GUILD_INSTALL,
            ApplicationIntegrationTypes.USER_INSTALL,
        ],
        contexts: [
            InteractionContextTypes.BOT_DM,
            InteractionContextTypes.GUILD,
            InteractionContextTypes.PRIVATE_CHANNEL,
        ],
        type: ApplicationCommandTypes.CHAT_INPUT,
    })