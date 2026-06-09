"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("mute remove")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    const res = [];
    const user1 = interaction.data.options.getUser("user1", true);
    const user2 = interaction.data.options.getUser("user2", false);
    const user3 = interaction.data.options.getUser("user3", false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    for (const user of users) {
        try {
            const member = await guild.getMember(user.id);
            if (!member) {
                res.push(`⚠️ \`\`${user.globalName ?? user.username}\`\` não está no servidor`);
                continue;
            }
            await member.edit({
                communicationDisabledUntil: null,
            });
            res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` desmutado com sucesso!`);
        }
        catch {
            res.push(`${await app.getMenoji("no")} Erro ao desmutar \`\`${user.globalName ?? user.username}\`\``);
        }
    }
    await interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [
            {
                type: 17,
                accentColor: 0x3680ff,
                components: [
                    {
                        type: 10,
                        content: `# 📄 Console de desmute\n\n${res
                            .map((r) => `- ${r}`)
                            .join("\n")}`,
                    },
                ],
            },
        ],
    });
});
