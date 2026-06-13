import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("server splash")

    .setRun(async function ({ app, guild, interaction }) {
        if (!guild) return;

        const url = guild.splashURL();

        if (!url) {
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `🚫 Este servidor não possue estandarte de convite!`,
                }],
            });

            return;
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${guild.name}**`,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url,
                        },
                    }],
                }],
            }, {
                type: 1,
                components: [{
                    url,
                    type: 2,
                    style: 5,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }],
            }],
        });
    });