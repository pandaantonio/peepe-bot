"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("member banner")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser('user', false) ?? author;
    const user = await app.rest.users.get(option.id);
    const member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;
    const _banner = user.bannerURL();
    const banner = member && member.bannerURL() && _banner !== member.bannerURL() ? member.bannerURL() : undefined;
    if (!banner) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este membro não possue estandarte!`
                }],
        });
        return;
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `[**${member?.nick ?? user.globalName ?? user.username}**](${banner})`
                    }, {
                        type: 12,
                        items: [{
                                media: {
                                    url: banner,
                                },
                            }],
                    }],
            }],
    });
});
