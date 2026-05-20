import { MessageFlags } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .addName("server icon")

    .setRun(async ({ app, guild, interaction }) => {
        if(!guild) return;

        const icon = guild.iconURL();

        if(!icon){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue ícone!`,
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
                            url: icon,
                        },
                    }],
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: icon,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }]
            }]
        });
    });