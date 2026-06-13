import ActionRowBuilder from "@/lib/ActionRowBuilder";
import ComponentBuilder from "@/lib/ComponentBuilder";
import ContainerBuilder from "@/lib/ContainerBuilder";
import MediaGalleryBuilder from "@/lib/MediaGalleryBuilder";
import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("user banner")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser('user', false) ?? author,
            user = await app.rest.users.get(option.id),
            member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;

        const banner = user.bannerURL(),
            bannerLocal = member && member.bannerURL() && member.bannerURL() !== banner ? member.bannerURL() : undefined;

        if (!banner && !bannerLocal) {
            interaction.createFollowup(
                new ComponentBuilder()
                    .addTextDisplay((fn) => fn
                        .setContent(`🚫 Este usuário não possue estandarte!`)
                    )
                    .build()
            );

            return;
        }

        const mediaGallery = new MediaGalleryBuilder(),
            actionRow = new ActionRowBuilder(),
            container = new ContainerBuilder()
                .addTextDisplay(`**${member?.nick ?? user.globalName ?? user.username}**`);

        if (banner) {
            mediaGallery.addItem(banner, "Estandarte Global");
            actionRow.addLinkButton(banner, "Estandarte Global", await app.getButoji("download"));
        }

        if (bannerLocal) {
            mediaGallery.addItem(bannerLocal, "Estandarte Local");
            actionRow.addLinkButton(bannerLocal, "Estandarte Local", await app.getButoji("download"));
        }

        container.addMediaGallery(mediaGallery);

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [container.build(), actionRow.build()],
        });
    });