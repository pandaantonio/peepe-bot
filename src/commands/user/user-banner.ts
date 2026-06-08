import Command from "@/struct/command";
import { MediaGalleryItem, MessageActionRowComponent, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("user banner")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const banner = user.bannerURL();

        const member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;
        const bannerLocal = member && member.bannerURL() && member.bannerURL() !== banner ? member.bannerURL() : undefined;

        if (!banner && !bannerLocal) {
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este usuário não possue estandarte!`
                }],
            });

            return;
        }

        const components: MessageActionRowComponent[] = [];
        const items: MediaGalleryItem[] = [];

        if (banner) {
            components.push({
                type: 2,
                style: 5,
                url: banner,
                label: "Estandarte Global",
                emoji: await app.getButoji("download"),
            });
            
            items.push({
                media: {
                    url: banner,
                },
                description: "Estandarte Global"
            });
        }

        if (bannerLocal) {
            components.push({
                type: 2,
                style: 5,
                url: bannerLocal,
                label: "Estandarte Local",
                emoji: await app.getButoji("download"),
            });
            
            items.push({
                media: {
                    url: bannerLocal,
                },
                description: "Estandarte Local"
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# ${member?.nick ?? user.globalName ?? user.username}`,
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