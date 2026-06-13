import ComponentBuilder from "@/lib/ComponentBuilder";
import Command from "@/struct/command";

export default new Command()
    .setRun(async function ({ app, guild, interaction }) {
        const shard = guild ? guild.shard : app.shards.random();

        interaction.createFollowup(
            new ComponentBuilder()
                .addTextDisplay((fn) => fn
                    .setContent(`# 🏓 Pong!\n\n**Shard** (${shard?.id}): \`\`${shard?.latency} ms\`\``)
                )
                .build(),
        );
    })

    .setCommand({
        type: 1,
        name: "ping",
        description: "See my latency.",
        descriptionLocalizations: {
            "pt-BR": "Veja minha latência."
        },
    });