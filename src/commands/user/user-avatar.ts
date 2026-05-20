import { MessageFlags, MediaGalleryItem, MessageActionRowComponent } from "oceanic.js";
import Command from "../../app/command";

export default new Command()
    .addName("user avatar")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const avatar = user.avatarURL();

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${user.globalName ?? user.username}**`
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: avatar
                        }
                    }]
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
    });