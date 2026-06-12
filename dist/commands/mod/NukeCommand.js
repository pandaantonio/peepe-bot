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
    if (!interaction.channel.permissionsOf(app.user.id).has("MANAGE_CHANNELS")) {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} É Necessário eu ter a permissão de gerenciar canal.`
        });
        return;
    }
    const channel = interaction.channel;
    interaction.createFollowup({
        content: `💥 Iniciando o bigbang...`
    });
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
        if (guild.rulesChannelID === channel.id)
            await guild.edit({ rulesChannelID: ch.id });
        if (guild.systemChannelID === channel.id)
            await guild.edit({ systemChannelID: ch.id });
        if (guild.safetyAlertsChannelID === channel.id)
            await guild.edit({ safetyAlertsChannelID: ch.id });
        if (guild.publicUpdatesChannelID === channel.id)
            await guild.edit({ publicUpdatesChannelID: ch.id });
        const message = await ch.createMessage({
            content: `${await app.getMenoji("yes")} ${author.mention} Canal clonado e apagado garantindo que nenhuma mensagem anterior apareça.`
        });
        await channel.delete().catch(() => undefined);
        setTimeout(async () => {
            await message.delete();
        }, 25000);
    })
        .catch(async () => {
        interaction.editOriginal({
            content: `${await app.getMenoji("no")} Erro ao iniciar bigbang!`
        });
        setTimeout(async () => {
            await interaction.deleteOriginal();
        }, 25000);
    });
})
    .setCommand({
    type: 1,
    name: "nuke",
    description: "It clones the current channel and removes the original, deleting all message history..",
    descriptionLocalizations: {
        "pt-BR": "Ele clona o canal atual e remove o original, apagando todo o histórico de mensagens.."
    },
    dmPermission: false,
    defaultMemberPermissions: "16",
});
