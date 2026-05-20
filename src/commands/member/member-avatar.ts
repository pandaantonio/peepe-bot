import { MessageFlags } from "oceanic.js";
import Command from "../../app/command";

export default new Command()
    .addName('member avatar')

    .setRun(async ({ app, guild, author, interaction }) => {
        if(!guild) return;

        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const member = await guild.getMember(option.id);
        const avatar2 = user.avatarURL();

        if(!member){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                content: `${await app.getMenoji("no")} Este usuário não pertence á esse servidor!`
            });

            return;
        }

        const avatar = member.avatarURL();

        if(!avatar || avatar && avatar === avatar2){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                content: `${await app.getMenoji("no")} Este membro não possue avatar!`,
            });
            
            return;
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${member.nick ?? user.globalName ?? user.username}**`
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: avatar,
                        },
                    }],
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    url: avatar,
                    label: "Baixar",
                    emoji: await app.getButoji("download"),
                }],
            }],
        });
    })