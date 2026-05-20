"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName("user avatar")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const avatar = user.avatarURL();
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `**${user.globalName ?? user.username}**`
                    }, {
                        type: 12,
                        items: [{
                                media: {
                                    url: avatar
                                }
                            }]
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: avatar,
                        label: "Baixar",
                        emoji: await app.getButoji("download"),
                    }],
            }],
    });
});
