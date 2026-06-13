import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("encode binary")

    .setRun(async function ({ interaction }) {
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 10,
                content: `\`\`\`${text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')}\`\`\``,
            }],
        });
    })