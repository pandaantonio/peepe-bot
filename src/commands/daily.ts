import { adminDb } from "@/database/firebaseAdmin";
import EphemeralOption from "@/options/EphemeralOption";
import Command from "@/struct/command";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .setRun(async function({ app, author, interaction }){
        const option = interaction.data.options.getUser("user", false) ?? author;
        const snapshot = await adminDb.ref(`users/${option.id}`).once('value');
        const data = snapshot.val();

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    label: "Resgatar recompeça diária",
                    url: `${process.env.WEBSITE}/daily`,
                    emoji: { name: "🎁" },
                }],
            }]
        });
    })

    .setCommand({
        name: "daily",
        description: "Claim your daily reward.",
        descriptionLocalizations: {
            "pt-BR": "Resgate sua recompeça diária."
        },
        options: [EphemeralOption(false)],
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