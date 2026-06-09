"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("ban remove")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    let res = [];
    const user1 = interaction.data.options.getUser('user1', true);
    const user2 = interaction.data.options.getUser('user2', false);
    const user3 = interaction.data.options.getUser('user3', false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    for (const user of users) {
        await guild.removeBan(user.id)
            .then(async () => {
            res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` Desbanido com sucesso!`);
        })
            .catch(async (e) => {
            console.log(e);
            res.push(`${await app.getMenoji("no")} Não foi possivel remover banimento de \`\`${user.globalName ?? user.username}\`\`!`);
        });
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                accentColor: 0xff3515,
                components: [{
                        type: 10,
                        content: `# 📄 **Console de desbanimentos**\n\n${res.map((r) => `- ${r}`).join("\n")}`
                    }],
            }],
    });
});
