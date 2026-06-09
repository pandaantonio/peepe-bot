"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("purge")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    const channel = interaction.channel;
    const message = await interaction.getOriginal();
    const amount = Math.min(interaction.data.options.getInteger("amount", false) ?? 2000, 2000); // limite seguro
    const user1 = interaction.data.options.getUser('user1', false);
    const user2 = interaction.data.options.getUser('user2', false);
    const user3 = interaction.data.options.getUser('user3', false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    const onlyApps = interaction.data.options.getBoolean("apps", false);
    if (!channel || channel.type !== 0)
        return;
    await channel.purge({
        limit: amount,
        filter: (m) => {
            // Se especificou apenas apps
            if (onlyApps === true) {
                return m.author.bot === true && m.id !== message.id;
            }
            // Se especificou apenas humanos (apps = false)
            if (onlyApps === false) {
                return m.author.bot === false && m.id !== message.id;
            }
            // Se especificou usuários específicos
            if (users.length > 0) {
                return users.some(u => u.id === m.author.id) && m.id !== message.id;
            }
            // Se não especificou nada, apaga tudo
            return m.id !== message.id;
        }
    }).then(async (deletedAmount) => {
        interaction.createFollowup({
            content: `${await app.getMenoji("clear")} **${deletedAmount}** mensagens foram apagadas!`
        });
    }).catch(async (e) => {
        console.error(e);
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Não foi possível apagar as mensagens do chat!`
        });
    });
});
