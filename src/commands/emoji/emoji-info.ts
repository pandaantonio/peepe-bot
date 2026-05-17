import Command from "../../app/command";
import getEmoji from "../../utils/GetEmoji";
import EmojiOption from "../../options/EmojiOption";
import EphemeralOption from "../../options/EphemeralOption";

export default new Command()
    .addName("emoji info")

    .setRun(async function ({ app, interaction }) {
        const emoji = await getEmoji(interaction.data.options.getString("emoji", true));

        if (!emoji) {
            interaction.createFollowup({
                content: `${await app.getMenoji("no")} Emoji inválido!`,
            });

            return;
        }

        interaction.createFollowup({
            embeds: [{
                thumbnail: { url: emoji.url },
                title: `${emoji.mention} ${emoji.name}`,
                fields: [{
                    inline: true,
                    name: "Animado?",
                    value: `\`\`${emoji.animated ? "SIM" : "NÃO"}\`\``
                }, {
                    inline: true,
                    name: "Id",
                    value: `\`\`${emoji.id}\`\``,
                }, {
                    inline: true,
                    name: "Menção",
                    value: `\`\`${emoji.mention}\`\``,
                }, {
                    name: "Criado",
                    value: `<t:${parseInt(`${emoji.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${emoji.createdAt.getTime() / 1000}`)}:R>)`
                }],
            }],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: emoji.url,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }]
            }],
        });
    })

    .setSubCommand({
        type: 1,
        name: 'info',
        description: "Emoji information.",
        descriptionLocalizations: {
            "pt-BR": "Informações sobre o emoji."
        },
        options: [EmojiOption(true), EphemeralOption(false)],
    });