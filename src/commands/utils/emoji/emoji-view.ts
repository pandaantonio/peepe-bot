import Command from "@/struct/command";
import getEmoji from "@/utils/GetEmoji";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("emoji view")

    .setRun(async function({ app, interaction }){
        const emojiText = interaction.data.options.getString("emoji", true);
        const emoji = await getEmoji(emojiText);

        if(!emoji){
            interaction.createFollowup({
                content: `${await app.getMenoji("no")} Emoji inexistente.`,
            });

            return;
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# ${emoji.name}`,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: emoji.url,
                        },
                        description: "Emoji",
                    }]
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: emoji.url,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }],
            }],
        });
    })