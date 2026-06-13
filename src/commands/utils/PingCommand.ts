import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .setRun(async function ({ app, guild, interaction }) {
        const shard = guild ? guild.shard : app.shards.random();

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 10,
                content: `# 🏓 Pong!\n\n**Shard** (${shard?.id}): \`\`${shard?.latency} ms\`\``,
            }],
        });
    })

    .setCommand({
        type: 1,
        name: "ping",
        description: "See my latency.",
        descriptionLocalizations: {
            "pt-BR": "Veja minha latência."
        },
    });