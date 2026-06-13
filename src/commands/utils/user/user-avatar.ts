import ActionRowBuilder from "@/lib/ActionRowBuilder";
import ContainerBuilder from "@/lib/ContainerBuilder";
import MediaGalleryBuilder from "@/lib/MediaGalleryBuilder";
import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("user avatar")

    .setRun(async function ({ app, guild, author, interaction }) {
        const option = interaction.data.options.getUser('user', false) ?? author,
            user = await app.rest.users.get(option.id),
            member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;

        const avatar = user.avatarURL(),
            avatarLocal = member && member.avatarURL() && member.avatarURL() !== avatar ? member.avatarURL() : undefined;

        const mediaGallery = new MediaGalleryBuilder(),
            actionRow = new ActionRowBuilder()
                .addLinkButton(avatar, "Avatar Global", await app.getButoji("download")),
            container = new ContainerBuilder()
                .addTextDisplay(`**${member?.nick ?? user.globalName ?? user.username}**`)

        if (avatarLocal) {
            mediaGallery.addItem(avatarLocal, "Avatar Local");
            actionRow.addLinkButton(avatarLocal, "Avatar Local", await app.getButoji("download"));
        }

        container.addMediaGallery(mediaGallery);

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [container.build(), actionRow.build()],
        });
    });