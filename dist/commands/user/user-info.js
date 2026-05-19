"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
exports.default = new command_1.default()
    .addName("user info")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const avatarGlobal = user.avatarURL();
    const bannerGlobal = user.bannerURL();
    const createdAt = parseInt(`${user.createdAt.getTime() / 1000}`);
    const member = await guild?.getMember(option.id);
    const avatarLocal = member?.avatarURL();
    const bannerLocal = member?.bannerURL();
    const joinedAt = member && member.joinedAt ?
        parseInt(`${member.joinedAt.getTime() / 1000}`) :
        undefined;
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
                            ].join("\n")
                        }],
                    accessory: {
                        type: 11,
                        media: {
                            url: avatarGlobal,
                        },
                    },
                }],
        }];
    if (bannerGlobal) {
        if (components[0].type === 17) {
            components[0].components.push({
                type: 12,
                items: [{
                        media: {
                            url: bannerGlobal,
                        },
                    }],
            });
        }
    }
    if (member) {
        if (components[0].type === 17) {
            let content = [];
            if (member.nick) {
                content.push(`**${member.nick}**\n`);
            }
            content.push(`${await app.getMenoji("calendar")} **Entrou em**:`, `<t:${joinedAt}:f> (<t:${joinedAt}:R>)`);
            components[0].components.push({
                type: 14, // ComponentType.SEPARATOR
                divider: true,
                spacing: 1
            }, avatarLocal ? ({
                type: 9,
                components: [{
                        type: 10,
                        content: content.join("\n"),
                    }],
                accessory: {
                    type: 11,
                    media: {
                        url: avatarLocal,
                    },
                },
            }) : ({
                type: 10,
                content: content.join("\n"),
            }));
            if (bannerLocal && bannerLocal !== bannerGlobal) {
                components[0].components.push({
                    type: 12,
                    items: [{
                            media: {
                                url: bannerLocal,
                            },
                        }],
                });
            }
        }
    }
    interaction.createFollowup({
        components,
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
    });
});
