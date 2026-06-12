import Command from "@/struct/command";

export default new Command()
    .addName("decode binary")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            content: `\`\`\`${text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('')}\`\`\``
        });
    })