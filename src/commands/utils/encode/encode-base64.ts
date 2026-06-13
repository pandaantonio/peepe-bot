import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("encode base64")

    .setRun(async function({ interaction }){
        const text = interaction.data.options.getString("text", true);

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 10,
                content: `\`\`\`${Buffer.from(text).toString('base64')}\`\`\``,
            }]
        });
    })