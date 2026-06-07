import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("member avatar")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;
        const _avatar = user.avatarURL();
        const avatar = member && member.avatarURL() && _avatar !== member.avatarURL() ? member.avatarURL() : undefined;

         if(!avatar){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este membro não possue avatar!`
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
                    content: `[**${member?.nick ?? user.globalName ?? user.username}**](${avatar})`
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: avatar,
                        },
                    }],
                }],
            }],
        });
    });