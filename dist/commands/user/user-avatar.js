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
    const member = guild ? await guild.getMember(option.id).catch(() => undefined) : undefined;
    const url = user.avatarURL();
    const url2 = member?.avatarURL();
    const items = [{
            media: {
                url,
            },
            description: "Avatar Global",
        }];
    const components = [{
            url,
            type: 2,
            style: 5,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];
    if (url2) {
        items.push({
            media: {
                url: url2,
            },
            description: "Avatar Local",
        });
        components.push({
            url: url2,
            type: 2,
            style: 5,
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
                        content: `[**${member?.nick ?? user.globalName ?? user.username}**](${url})`,
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
