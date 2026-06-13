import ComponentBuilder from "@/lib/ComponentBuilder";
import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("server banner")

    .setRun(async function({ app, guild, interaction }){
        if(!guild) return;

        const url = guild.bannerURL();

        if(!url){
            interaction.createFollowup(
                new ComponentBuilder()
                    .addTextDisplay((fn) => fn
                        .setContent(`🚫 Este servidor não possue estandarte!`)
                    )
                    .build(),
            );

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