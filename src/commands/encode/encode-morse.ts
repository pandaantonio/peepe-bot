import Command from "@/struct/command";
import { MORSE_CODE } from "@/utils/morse";

export default new Command()
    .addName("encode morse")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            //@ts-ignore
            content: `\`\`\`${text.toLowerCase().split('').map(c => MORSE_CODE[c] ?? c).join(' ')}\`\`\``
        });
    })