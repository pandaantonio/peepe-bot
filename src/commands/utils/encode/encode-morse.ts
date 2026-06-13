import Command from "@/struct/command";
import { MORSE_CODE } from "@/utils/morse";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("encode morse")

    .setRun(async function ({ interaction }) {
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 10,
                //@ts-ignore
                content: `\`\`\`${text.toLowerCase().split('').map(c => MORSE_CODE[c] ?? c).join(' ')}\`\`\``,
            }],
        });
    })