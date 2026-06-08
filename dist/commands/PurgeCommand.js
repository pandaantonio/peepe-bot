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
    let res = [];
    const channel = interaction.channel;
    const amount = interaction.data.options.getInteger("amount", false) ?? 2000;
    const user1 = interaction.data.options.getUser('user1', false);
    const user2 = interaction.data.options.getUser('user2', false);
    const user3 = interaction.data.options.getUser('user3', false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    const apps = interaction.data.options.getBoolean("apps", false);
    if (!channel || channel && (channel.type !== 0))
        return;
    await channel.purge({
        limit: amount,
        filter: (m) => {
            let b = [];
            if (typeof apps !== "boolean" && !users[0]) {
                b.push(true);
            }
            else {
                if (typeof apps === "boolean") {
                    if (m.author.bot === apps)
                        b.push(true);
                    else
                        b.push(false);
                }
                if (users && users[0]) {
                    if (users.some((u) => u.id === m.author.id))
                        b.push(true);
                    else
                        b.push(false);
                }
            }
            return b.some((x) => x === true);
        }
    }).then(async (Amount) => {
        interaction.createFollowup({
            content: `${await app.getMenoji("yes")} **${Amount}** Mensagens foram apagadas!`
        });
    }).catch(async (e) => {
        console.log(e);
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Não foi possível apagar as mensagens do chat!`
        });
    });
});
