import Command from "@/struct/command";

export default new Command()
    .addName("decode base64")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            content: `\`\`\`${Buffer.from(text, 'base64').toString('utf-8')}\`\`\``
        });
    })