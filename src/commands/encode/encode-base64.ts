import Command from "@/struct/command";

export default new Command()
    .addName("encode base64")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            content: `\`\`\`${Buffer.from(text).toString('base64')}\`\`\``
        });
    })