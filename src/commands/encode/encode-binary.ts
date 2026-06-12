import Command from "@/struct/command";

export default new Command()
    .addName("encode binary")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            content: `\`\`\`${text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')}\`\`\``
        });
    })