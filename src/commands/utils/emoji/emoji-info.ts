import Command from "@/struct/command";
import getEmoji from "@/utils/GetEmoji";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("emoji info")

    .setRun(async function ({ app, interaction }) {
        const emojiText = interaction.data.options.getString("emoji", true);
        const emoji = await getEmoji(emojiText);

        if (!emoji) {
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
                    type: 9,
                    components: [{
                        type: 10,
                        content: [
                            `# ${emoji.name}\n`,
                            `${await app.getMenoji("gif")} **Animado**? \`\`${emoji.animated ? "SIM" : "NÃO"}\`\``,
                            `${await app.getMenoji("id")} **Id**: \`\`${emoji.id}\`\``,
                            `${await app.getMenoji("mention")} **Menção**: \`\`\\${emoji.mention}\`\``,
                            `${await app.getMenoji("calendar")} **Criado em**: <t:${parseInt(`${emoji.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${emoji.createdAt.getTime() / 1000}`)}:R>)`,
                        ].join("\n"),
                    }],
                    accessory: {
                        type: 11,
                        media: {
                            url: emoji.url,
                        },
                    },
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