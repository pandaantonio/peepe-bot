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
    if (bannerGlobal) {
        items.push({
            media: {
                url: bannerGlobal,
            },
        });
        components.push({
            type: 2,
            style: 5,
            url: bannerGlobal,
            label: "Estandarte Global",
            emoji: await app.getButoji("download"),
        });
    }
    if (bannerLocal && bannerLocal !== bannerGlobal) {
        items.push({
            media: {
                url: bannerLocal,
            },
        });
        components.push({
            type: 2,
            style: 5,
            url: bannerLocal,
            label: "Estandarte Local",
            emoji: await app.getButoji("download"),
        });
    }
    let content = [
        `# ${user.globalName ?? user.username}${member && member.nick ? ` (${member.nick})` : ""}\n`,
        `## > ${await app.getMenoji("id")} ID: \`\`${user.id}\`\``,
        `## > ${await app.getMenoji("id")} Username: \`\`${user.username}\`\``,
        `## > ${await app.getMenoji("mention")} Menção: \`\`${user.mention}\`\``,
        `## > ${await app.getMenoji("calendar")} Conta criada: <t:${createdAt}:f> (<t:${createdAt}:R>)`,
    ];
    if (member && member.joinedAt) {
        const joinedAt = parseInt(`${member.joinedAt.getTime() / 1000}`);
        content.push(`## > ${await app.getMenoji("calendar")} Entrou em: <t:${joinedAt}:f> (<t:${joinedAt}:R>)`);
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                accentColor: user.accentColor ?? 0x147aff,
                components: [{
                        type: 10,
                        content: content.join("\n"),
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
