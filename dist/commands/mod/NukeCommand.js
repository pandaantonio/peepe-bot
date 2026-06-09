"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("nuke")
    .setRun(async function ({ app, guild, author, interaction }) {
    if (!guild)
        return;
    if (!interaction.channel)
        return;
    if (interaction.channel.type !== 0)
        return;
    const channel = interaction.channel;
    interaction.createFollowup({
        content: `💥 Iniciando o bigbang...`
    });
    setTimeout(async () => {
        await guild.createChannel(channel.type, {
            name: channel.name,
            nsfw: channel.nsfw,
            topic: channel.topic,
            parentID: channel.parentID,
            position: channel.position,
            rateLimitPerUser: channel.rateLimitPerUser,
            permissionOverwrites: channel.permissionOverwrites.map((p) => p),
        })
            .then(async (ch) => {
            await ch.createMessage({
                content: `${await app.getMenoji("yes")} ${author.mention} Canal clonado e apagado garantindo que nenhuma mensagem anterior apareça.`
            });
            await channel.delete().catch(() => undefined);
        })
            .catch(async () => {
            interaction.editOriginal({
                content: `${await app.getMenoji("no")} Erro ao iniciar bigbang!`
            });
        });
    }, 15000);
});
