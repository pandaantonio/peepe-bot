"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("user banner")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const bannerGlobal = user.bannerURL();
    const member = await guild?.getMember(option.id);
    const bannerLocal = member?.bannerURL();
    const items = [];
    const components = [];
    if (bannerGlobal) {
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
    if (bannerLocal && bannerLocal !== bannerGlobal) {
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
    if (!bannerGlobal && !bannerLocal) {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Este usuário não possue estandarte!`,
        });
        return;
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
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
