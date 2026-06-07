"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("user banner")
    .setRun(async function ({ app, author, interaction }) {
    const option = interaction.data.options.getUser('user', false) ?? author;
    const user = await app.rest.users.get(option.id);
    const banner = user.bannerURL();
    if (!banner) {
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este usuário não possue estandarte!`
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
                        content: `[**${user.globalName ?? user.username}**](${banner})`,
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
