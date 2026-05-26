import { adminDb } from "@/database/firebaseAdmin";
import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import Command from "@/struct/command";
import axios from "axios";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MessageFlags } from "oceanic.js";

interface BalanceData {
    coins: number;
    totalEarned: number;
    totalClaims: number;
    streak: number;
    lastClaimed: string;
    createdAt: string;
};
async function getData(id: string): Promise<BalanceData | undefined> {
    return await axios.get(`${process.env.WEBSITE}/api/users/${id}`)
        .then((res) => res.data)
        .catch(() => undefined);
}

export default new Command()
    .setRun(async function({ app, author, interaction }){
        const option = interaction.data.options.getUser("user", false) ?? author;
        const data = await getData(option.id);
        const coins = data && data.coins ? data.coins : 0;

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 9,
                    components: [{
                        type: 10,
                        content: `**Saldo de**\n-# ${option.globalName ?? option.username}`,
                    }, {
                        type: 10,
                        content: `# ${coins} ${await app.getMenoji("coin")}`
                    }],
                    accessory: {
                        type: 11,
                        media: {
                            url: option.avatarURL(),
                        },
                    },
                }]
            }],
            allowedMentions: {
                users: false,
            },
        });
    })

    .setCommand({
        name: "balance",
        nameLocalizations: {
            "pt-BR": "saldo"
        },
        description: "View a user's balance.",
        descriptionLocalizations: {
            "pt-BR": "Veja o saldo de um usuário"
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
    });