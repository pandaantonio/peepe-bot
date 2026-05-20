import { MessageFlags, MediaGalleryItem, MessageActionRowComponent } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .addName("user avatar")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const avatarGlobal = user.avatarURL();

        const member = await guild?.getMember(option.id).catch(() => undefined);
        const avatarLocal = member?.avatarURL();

        const items: MediaGalleryItem[] = [{
            media: {
                url: avatarGlobal,
            },
        }];
        const components: MessageActionRowComponent[] = [{
            type: 2,
            style: 5,
            url: avatarGlobal,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];

        if(avatarLocal && avatarLocal !== avatarGlobal){
            items.push({
                media: {
                    url: avatarLocal,
                },
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
                    content: `**${user.globalName ?? user.username}${member && member.nick ? ` (${member.nick})` : ""}**`
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