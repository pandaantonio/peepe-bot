"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const timeoutUtil_1 = __importDefault(require("@/utils/timeoutUtil"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("mute")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    await interaction.defer();
    const res = [];
    const user1 = interaction.data.options.getUser("user1", true);
    const user2 = interaction.data.options.getUser("user2", false);
    const user3 = interaction.data.options.getUser("user3", false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    const time = interaction.data.options.getString("time", true);
    const duration = (0, timeoutUtil_1.default)(time);
    if (!duration) {
        await interaction.createFollowup({
            content: "❌ Tempo inválido! Exemplos: `5s`, `10m`, `1h`, `7d`, `1h30m`",
        });
        return;
    }
    const maxTimeout = 28 * 24 * 60 * 60 * 1000;
    if (duration > maxTimeout) {
        await interaction.createFollowup({
            content: "❌ O timeout máximo permitido é de **28 dias**.",
        });
        return;
    }
    const timeoutUntil = new Date(Date.now() + duration).toISOString();
    for (const user of users) {
        try {
            const member = await guild.getMember(user.id);
            if (!member) {
                res.push(`⚠️ \`\`${user.globalName ?? user.username}\`\` não está no servidor`);
                continue;
            }
            await member.edit({
                communicationDisabledUntil: timeoutUntil,
            });
            res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` mutado com sucesso!`);
        }
        catch {
            res.push(`${await app.getMenoji("no")} Erro ao mutar \`\`${user.globalName ?? user.username}\`\``);
        }
    }
    await interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [
            {
                type: 17,
                components: [
                    {
                        type: 10,
                        content: `# 📄 Console de mute\n\n${res
                            .map((r) => `- ${r}`)
                            .join("\n")}`,
                    },
                ],
            },
        ],
    });
});
