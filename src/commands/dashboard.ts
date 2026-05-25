import Command from "@/struct/command";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .setCommand({
        name: "dashboard",
        nameLocalizations: {
            "pt-BR": "painel",
        },
        description: "Access the bot's control panel.",
        descriptionLocalizations: {
            "pt-BR": "Acesse o painel de controle do bot.",
        },
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

    .setRun(async function({ app, guild, interaction }){
        const dashboard = guild ? `${process.env.WEBSITE}/dashboard/${guild.id}` : `${process.env.WEBSITE}/dashboard`;

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 10,
                content: dashboard,
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: dashboard,
                    emoji: await app.getButoji("config"),
                }],
            }]
        });
    });