"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionRowBuilder_1 = __importDefault(require("@/lib/ActionRowBuilder"));
const ContainerBuilder_1 = __importDefault(require("@/lib/ContainerBuilder"));
const MediaGalleryBuilder_1 = __importDefault(require("@/lib/MediaGalleryBuilder"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("user banner")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser('user', false) ?? author, user = await app.rest.users.get(option.id), member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;
    const banner = user.bannerURL(), bannerLocal = member && member.bannerURL() && member.bannerURL() !== banner ? member.bannerURL() : undefined;
    if (!banner && !bannerLocal) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este usuário não possue estandarte!`
                }],
        });
        return;
    }
    const mediaGallery = new MediaGalleryBuilder_1.default(), actionRow = new ActionRowBuilder_1.default(), container = new ContainerBuilder_1.default()
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
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [container.build(), actionRow.build()],
    });
});
