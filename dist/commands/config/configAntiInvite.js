"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const firebaseAdmin_1 = require("@/lib/firebaseAdmin");
exports.default = new command_1.default()
    .addName("config anti-invite")
    .setRun(async function ({ app, guild, interaction }) {
    if (!guild)
        return;
    const enabled = interaction.data.options.getBoolean("enabled", true);
    const antinviteRef = firebaseAdmin_1.adminDb.ref(`guilds/${guild.id}/anti-invite`);
    await antinviteRef.set({
        enable: enabled,
    });
    interaction.createFollowup({
        content: `${await app.getMenoji(enabled ? "enable" : "disable")} Anti convites \`\`${enabled ? "Ativado" : "Desativado"}\`\` som sucesso!`
    });
});
