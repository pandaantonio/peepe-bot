import Command from "@/struct/command";
import { MediaGalleryItem, MessageActionRowComponent, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("user avatar")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const avatar = user.avatarURL();

        const member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;
        const avatarLocal = member && member.avatarURL() && member.avatarURL() !== avatar ? member.avatarURL() : undefined;

        const components: MessageActionRowComponent[] = [{
            type: 2,
            style: 5,
            url: avatar,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];
        const items: MediaGalleryItem[] = [{
            media: {
                url: avatar,
            },
            description: "Avatar Global",
        }];

        if (avatarLocal) {
            items.push({
                media: {
                    url: avatarLocal,
                },
                description: "Avatar Local",
            });

            components.push({
                type: 2,
                style: 5,
                url: avatarLocal,
                label: "Avatar Local",
                emoji: await app.getButoji("download"),
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${member?.nick ?? user.globalName ?? user.username}**`
                }, {
                    items,
                    type: 12,
                }],
            }, {
                type: 1,
                components,
            }],
        });
    });