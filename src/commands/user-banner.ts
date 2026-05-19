import { MessageFlags, MediaGalleryItem, MessageActionRowComponent } from "oceanic.js";
import Command from "../app/command";

export default new Command()
    .addName("user banner")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const bannerGlobal = user.bannerURL();

        const member = await guild?.getMember(option.id);
        const bannerLocal = member?.bannerURL();

        const items: MediaGalleryItem[] = [];
        const components: MessageActionRowComponent[] = [];

        if(bannerGlobal){
            items.push({
                media: {
                    url: bannerGlobal,
                },
            });
            components.push({
                type: 2,
                style: 5,
                url: bannerGlobal,
                label: "Estandarte Global",
                emoji: await app.getButoji("download"),
            });
        }

        if(bannerLocal && bannerLocal !== bannerGlobal){
            items.push({
                media: {
                    url: bannerLocal,
                },
            });
            
            components.push({
                type: 2,
                style: 5,
                url: bannerLocal,
                label: "Estandarte Local",
                emoji: await app.getButoji("download"),
            });
        }

        if(!bannerGlobal && !bannerLocal){
            interaction.createFollowup({
                content: `${await app.getMenoji("no")} Este usuário não possue estandarte!`,
            });
            
            return;
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                accentColor: user.accentColor ?? 0x147aff,
                components: [{
                    type: 10,
                    content: `# ${user.globalName ?? user.username}${member && member.nick ? ` (${member.nick})` : ""}`
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