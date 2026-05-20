import { MessageFlags } from "oceanic.js";
import Command from "../../app/command";

export default new Command()
    .addName("server banner")

    .setRun(async ({ app, guild, interaction }) => {
        if(!guild) return;

        const banner = guild.bannerURL();

        if(!banner){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue estandarte!`,
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
                            url: banner,
                        },
                    }],
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: banner,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }]
            }]
        });
    });