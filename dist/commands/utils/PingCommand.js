"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .setRun(async function ({ app, guild, interaction }) {
    const shard = guild ? guild.shard : app.shards.random();
    interaction.createFollowup({
        content: `# 🏓 Pong!\n\n**Shard** (${shard?.id}): \`\`${shard?.latency} ms\`\``,
    });
})
    .setCommand({
    type: 1,
    name: "ping",
    description: "See my latency.",
    descriptionLocalizations: {
        "pt-BR": "Veja minha latência."
    },
});
