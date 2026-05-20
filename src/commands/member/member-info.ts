import { MessageActionRowComponent, MessageFlags } from "oceanic.js";
import Command from "../../app/command";

export default new Command()
    .addName('member info')

    .setRun(async ({ app, guild, author, interaction }) => {
        if(!guild) return;

        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const member = await guild.getMember(option.id);

        if(!member){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                content: `${await app.getMenoji("no")} Este usuário não pertence á esse servidor!`
            });

            return;
        }

        const avatar = member.avatarURL();
        const banner = member.bannerURL();
        const avatar2 = user.avatarURL();
        const banner2 = user.bannerURL();
        const joinedAt = member.joinedAt ? parseInt(`${member.joinedAt.getTime() / 1000}`) : undefined;

        const components: MessageActionRowComponent[] = [];

        if(avatar && avatar !== avatar2){
            components.push({
                type: 2,
                style: 5,
                url: avatar,
                label: "Avatar",
                emoji: await app.getButoji("download"),
            });
        }

        if(banner && banner !== banner2){
            components.push({
                type: 2,
                style: 5,
                url: banner,
                label: "Estandarte",
                emoji: await app.getButoji("download"),
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 9,
                    components: [{
                        type: 10,
                        content: [
                            `**${member.nick ?? user.globalName ?? user.username}**`,
                            "",
                            `${await app.getMenoji("calendar")} **Entrou em**:`,
                            `<t:${joinedAt}:f> (<t:${joinedAt}:R>)`
                        ].join("\n"),
                    }],
                    accessory: {
                        type: 11,
                        media: {
                            url: avatar ?? avatar2,
                        },
                    }
                }]
            }],
        });
    })