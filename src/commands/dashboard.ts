import Command from "@/struct/command";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .setRun(async function({ app, guild, interaction }){
        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# ${await app.getMenoji("config")} Painel de Controle\n\n## Quer acessar o painel de controle? É só ir em Atividades e abrir a minha atividade! 🚀`,
                }],
            }]
        });
    })

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
    });