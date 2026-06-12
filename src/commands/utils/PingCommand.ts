import Command from "@/struct/command";

export default new Command()
    .setRun(async function({ app, guild, interaction }){
        const shard = guild ? guild.shard : app.shards.random();

        interaction.createFollowup({
            content: `# 🏓 Pong!\n\n**Shard** (${shard?.id}): \`\`${shard?.latency} ms\`\``,
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