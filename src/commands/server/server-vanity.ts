import { MessageFlags } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .addName("server vanity")

    .setRun(async ({ app, guild, interaction }) => {
        if(!guild) return;

        const vanity = guild.vanityURLCode ? `https://discord.gg/${guild.vanityURLCode}` : undefined;

        if(!vanity){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este servidor não possue url personalizada!`,
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
                    content: `**${guild.name}**\n\n${vanity}`,
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: vanity,
                    label: "Servidor",
                    emoji: await app.getButoji("download"),
                }]
            }]
        });
    });