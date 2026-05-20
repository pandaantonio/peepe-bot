"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName('member banner')
    .setRun(async ({ app, guild, author, interaction }) => {
    if (!guild)
        return;
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const member = await guild.getMember(option.id);
    const banner2 = user.bannerURL();
    if (!member) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            content: `${await app.getMenoji("no")} Este usuário não pertence á esse servidor!`
        });
        return;
    }
    const banner = member.bannerURL();
    if (!banner || banner && banner === banner2) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            content: `${await app.getMenoji("no")} Este membro não possue estandarte!`,
        });
        return;
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `**${member.nick ?? user.globalName ?? user.username}**`
                    }, {
                        type: 12,
                        items: [{
                                media: {
                                    url: banner,
                                },
                            }],
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: banner,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }],
            }],
    });
});
