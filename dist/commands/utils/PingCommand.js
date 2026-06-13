"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentBuilder_1 = __importDefault(require("@/lib/ComponentBuilder"));
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .setRun(async function ({ app, guild, interaction }) {
    const shard = guild ? guild.shard : app.shards.random();
    interaction.createFollowup(new ComponentBuilder_1.default()
        .addTextDisplay((fn) => fn
        .setContent(`# 🏓 Pong!\n\n**Shard** (${shard?.id}): \`\`${shard?.latency} ms\`\``))
        .build());
})
    .setCommand({
    type: 1,
    name: "ping",
    description: "See my latency.",
    descriptionLocalizations: {
        "pt-BR": "Veja minha latência."
    },
});
