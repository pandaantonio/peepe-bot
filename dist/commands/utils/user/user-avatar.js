"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("user avatar")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser('user', false) ?? author;
    const user = await app.rest.users.get(option.id);
    const avatar = user.avatarURL();
    const member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;
    const avatarLocal = member && member.avatarURL() && member.avatarURL() !== avatar ? member.avatarURL() : undefined;
    const components = [{
            type: 2,
            style: 5,
            url: avatar,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];
    const items = [{
            media: {
                url: avatar,
            },
            description: "Avatar Global",
        }];
    if (avatarLocal) {
        items.push({
            media: {
                url: avatarLocal,
            },
            description: "Avatar Local",
        });
        components.push({
            type: 2,
            style: 5,
            url: avatarLocal,
            label: "Avatar Local",
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
