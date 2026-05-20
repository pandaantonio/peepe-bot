import { MessageFlags } from "oceanic.js";
import Command from "../../app/command";

export default new Command()
    .addName("server splash")

    .setRun(async ({ app, guild, interaction }) => {
        if(!guild) return;

        const splash = guild.splashURL();

        if(!splash){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue fundo de convite!`,
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
                            url: splash,
                        },
                    }],
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: splash,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }]
            }]
        });
    });