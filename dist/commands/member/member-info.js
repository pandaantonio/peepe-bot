"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName('member info')
    .setRun(async ({ app, guild, author, interaction }) => {
    if (!guild)
        return;
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const member = await guild.getMember(option.id);
    if (!member) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            content: `${await app.getMenoji("no")} Este usuário não pertence á esse servidor!`
        });
        return;
    }
    const avatar = member.avatarURL();
    const banner = member.bannerURL();
    const avatar2 = user.avatarURL();
    const banner2 = user.bannerURL();
    const joinedAt = member.joinedAt ? parseInt(`${member.joinedAt.getTime() / 1000}`) : undefined;
    const components = [];
    if (avatar && avatar !== avatar2) {
        components.push({
            type: 2,
            style: 5,
            url: avatar,
            label: "Avatar",
            emoji: await app.getButoji("download"),
        });
    }
    if (banner && banner !== banner2) {
        components.push({
            type: 2,
            style: 5,
            url: banner,
            label: "Estandarte",
            emoji: await app.getButoji("download"),
        });
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 9,
                        components: [{
                                type: 10,
                                content: [
                                    `**${member.nick ?? user.globalName ?? user.username}**`,
                                    "",
                                    `${await app.getMenoji("calendar")} **Entrou em**:`,
                                    `<t:${joinedAt}:f> (<t:${joinedAt}:R>)`
                                ].join("\n"),
                            }],
                        accessory: {
                            type: 11,
                            media: {
                                url: avatar ?? avatar2,
                            },
                        }
                    }]
            }],
    });
});
