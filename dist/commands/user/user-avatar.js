"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("user avatar")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const avatarGlobal = user.avatarURL();
    const member = await guild?.getMember(option.id).catch(() => undefined);
    const avatarLocal = member?.avatarURL();
    const items = [{
            media: {
                url: avatarGlobal,
            },
        }];
    const components = [{
            type: 2,
            style: 5,
            url: avatarGlobal,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];
    if (avatarLocal && avatarLocal !== avatarGlobal) {
        items.push({
            media: {
                url: avatarLocal,
            },
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
