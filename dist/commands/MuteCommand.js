"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
const parse_duration_ms_1 = __importDefault(require("parse-duration-ms"));
exports.default = new command_1.default()
    .addName("mute")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    let res = [];
    const user1 = interaction.data.options.getUser('user1', true);
    const timeStr = interaction.data.options.getString("time", true);
    const durationMs = (0, parse_duration_ms_1.default)(timeStr);
    if (durationMs === undefined || durationMs <= 0) {
        interaction.createFollowup({
            content: "❌ Formato de tempo inválido! Use: `5s`, `10m`, `2h`, `1d`, ou `1h 30m`",
        });
        return;
    }
    const maxDuration = 28 * 24 * 60 * 60 * 1000;
    if (durationMs > maxDuration) {
        interaction.createFollowup({
            content: "❌ O mute não pode ser maior que **28 dias**!",
            flags: oceanic_js_1.MessageFlags.EPHEMERAL
        });
        return;
    }
    // Limite mínimo de 1 segundo
    if (durationMs < 1000) {
        interaction.createFollowup({
            content: "❌ O mute deve ser de no mínimo **1 segundo**!",
        });
        return;
    }
    const endTimestamp = new Date(Date.now() + durationMs);
    const endTimestampISO = endTimestamp.toISOString(); // Formato: "2024-01-15T10:30:00.000Z"
    // Função auxiliar para formatar a duração para exibição
    function formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const parts = [];
        if (days > 0)
            parts.push(`${days} dia${days > 1 ? 's' : ''}`);
        if (hours % 24 > 0)
            parts.push(`${hours % 24} hora${hours % 24 > 1 ? 's' : ''}`);
        if (minutes % 60 > 0)
            parts.push(`${minutes % 60} minuto${minutes % 60 > 1 ? 's' : ''}`);
        if (seconds % 60 > 0)
            parts.push(`${seconds % 60} segundo${seconds % 60 > 1 ? 's' : ''}`);
        return parts.join(' e ') || '0 segundos';
    }
    const durationFormatted = formatDuration(durationMs);
    const user2 = interaction.data.options.getUser('user2', false);
    const user3 = interaction.data.options.getUser('user3', false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    for (const user of users) {
        const member = await guild.getMember(user.id).catch(() => undefined);
        if (member) {
            await member.edit({
                communicationDisabledUntil: endTimestampISO,
            })
                .then(async () => {
                res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` mutado com sucesso por **${durationFormatted}**!`);
            })
                .catch(async (e) => {
                console.error(`Erro ao mutar ${user.id}:`, e);
                res.push(`${await app.getMenoji("no")} Não foi possível mutar \`\`${user.globalName ?? user.username}\`\`! (Sem permissões suficientes)`);
            });
        }
        else {
            res.push(`⚠️ \`\`${user.globalName ?? user.username}\`\` não pertence a este servidor!`);
        }
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `# 📄 **Console de mute**\n\n${res.map((r) => `- ${r}`).join("\n")}`
                    }],
            }],
    });
});
