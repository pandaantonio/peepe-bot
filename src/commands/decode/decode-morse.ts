import Command from "@/struct/command";
import { REVERSE_MORSE } from "@/utils/morse";

export default new Command()
    .addName("decode morse")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            content: `\`\`\`${text.split(' ').map(code => REVERSE_MORSE[code] || code).join('')}\`\`\``
        });
    })