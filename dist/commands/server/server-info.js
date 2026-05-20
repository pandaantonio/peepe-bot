"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("server info")
    .setRun(async ({ app, guild, author, interaction }) => {
    if (!guild)
        return;
    const createdAt = parseInt(`${guild.createdAt.getTime() / 1000}`);
    const owner = await app.rest.users.get(`${guild.ownerID}`);
    const member = await guild.getMember(author.id);
    const joinedAt = member.joinedAt ? parseInt(`${member.joinedAt.getTime() / 1000}`) : undefined;
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `**${guild.name}**\n\n${guild.description ?? ""}`,
                    }, {
                        type: 10,
                        content: [
                            `> 👥 **Membros**: \`\`${guild.memberCount}\`\``,
                            `> ${await app.getMenoji("id")} **ID**: \`\`${guild.id}\`\``,
                            `> ${await app.getMenoji("crown")} **Dono(a)**: ${owner.mention}`,
                            `> ${await app.getMenoji("calendar")} **Criado**: <t:${createdAt}:f> (<t:${createdAt}:R>)`,
                            joinedAt ? `> ${await app.getMenoji("join")} **Entrou em**: <t:${joinedAt}:f> (<t:${joinedAt}:R>)` : undefined
                        ].filter((s) => s !== undefined).join("\n"),
                    }],
            }],
        allowedMentions: {
            users: true,
        },
    });
});
