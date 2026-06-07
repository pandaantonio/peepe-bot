import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("user avatar")

    .setRun(async function({ app, author, interaction }){
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const avatar = user.avatarURL();

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `[**${user.globalName ?? user.username}**](${avatar})`
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