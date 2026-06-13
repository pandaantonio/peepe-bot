"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                    content: `🚫 Este usuário não possue estandarte!`,
                }],
        });
        return;
    }
    const items = [], components = [];
    if (banner) {
        items.push({
            media: { url: banner },
            description: "Estandarte Global",
        });
        components.push({
            type: 2,
            style: 5,
            url: banner,
            label: "Estandarte Global",
            emoji: await app.getButoji("download"),
        });
    }
    if (bannerLocal) {
        items.push({
            media: { url: bannerLocal },
            description: "Estandarte Local",
        });
        components.push({
            type: 2,
            style: 5,
            url: bannerLocal,
            label: "Estandarte Local",
            emoji: await app.getButoji("download"),
        });
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
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
