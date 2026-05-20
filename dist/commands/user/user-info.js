"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName("user info")
    .setRun(async function ({ app, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const avatar = user.avatarURL();
    const banner = user.bannerURL();
    const createdAt = parseInt(`${user.createdAt.getTime() / 1000}`);
    const components = [{
            type: 17,
            components: [{
                    type: 9,
                    components: [{
                            type: 10,
                            content: [
                                `**${user.globalName ?? user.username}**\n`,
                                `${await app.getMenoji("id")} **ID**:`,
                                `\`\`\`${user.id}\`\`\``,
                                `${await app.getMenoji("mention")} **Menção**:`,
                                `\`\`\`${user.mention}\`\`\``,
                                `${await app.getMenoji("pomelo")} **Nome**:`,
                                `\`\`\`${user.username}\`\`\``,
                                `${await app.getMenoji("calendar")} **Conta criada**:`,
                                `<t:${createdAt}:f> (<t:${createdAt}:R>)`
                            ].join("\n"),
                        }],
                    accessory: {
                        type: 11,
                        media: {
                            url: avatar,
                        },
                    },
                }],
        }];
    if (banner) {
        if (components[0].type === 17) {
            components[0].components.push({
                type: 12,
                items: [{
                        media: {
                            url: banner,
                        },
                    }],
            });
        }
    }
    interaction.createFollowup({
        components,
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
    });
});
