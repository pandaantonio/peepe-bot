import Command from "../../app/command";
import getEmoji from "../../utils/GetEmoji";
import EmojiOption from "../../options/EmojiOption";
import EphemeralOption from "../../options/EphemeralOption";

export default new Command()
    .addName("emoji view")

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
                title: emoji.name,
                image: { url: emoji.url },
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
        name: 'view',
        nameLocalizations: {
            "pt-BR": "ver"
        },
        description: "See a emoji.",
        descriptionLocalizations: {
            "pt-BR": "Veja o emoji."
        },
        options: [EmojiOption(true), EphemeralOption(false)],
    });