"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
const getApp_1 = __importDefault(require("@/utils/getApp"));
exports.default = new command_1.default()
    .addName("user info")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const user = await app.rest.users.get(option.id);
    const createdAt = parseInt(`${user.createdAt.getTime() / 1000}`);
    const member = await guild?.getMember(option.id);
    const joinedAt = member && member.joinedAt ?
        parseInt(`${member.joinedAt.getTime() / 1000}`) :
        undefined;
    const bot = user.bot ? await (0, getApp_1.default)(user.id) : undefined;
    let content = [
        `**${user.globalName ?? user.username}**\n`,
        bot && bot.description ? `\n${bot.description}\n\n` : undefined,
        `> ${await app.getMenoji("pomelo")} **Nome**: \`\`${user.username}\`\``,
        member && member.nick ?
            `> 📌 **Apelido**: \`\`${member.nick}\`\``
            : undefined,
        `> ${await app.getMenoji("id")} **ID**: \`\`${user.id}\`\``,
        `> ${await app.getMenoji("mention")} **Menção**: \`\`${user.mention}\`\``,
        `> ${await app.getMenoji("calendar")} **Conta criada**: <t:${createdAt}:f> (<t:${createdAt}:R>)`,
        member && member.joinedAt ?
            `> ${await app.getMenoji("join")} **Entrou em**: <t:${joinedAt}:f> (<t:${joinedAt}:R>)`
            : undefined,
        bot ?
            [`\n> ${await app.getMenoji("bot")} **Sobre o bot**:`,
                `- ${bot.bot_public ? await app.getMenoji("yes") : await app.getMenoji("no")} Público`,
                `- ${bot.bot_require_code_grant ? await app.getMenoji("yes") : await app.getMenoji("no")} Requer Código de Autenticação via OAuth2`
            ].join("\n") : undefined
    ];
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: content.filter((c) => c !== undefined).join("\n")
                    }]
            }],
    });
});
