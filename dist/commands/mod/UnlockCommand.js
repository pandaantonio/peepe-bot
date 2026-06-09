"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("lock remove")
    .setRun(async function ({ app, guild, interaction }) {
    if (!guild)
        return;
    if (!interaction.channel)
        return;
    if (interaction.channel.type !== 0)
        return;
    const everyone = guild.roles.find((o) => o.name === "@everyone");
    interaction.channel.editPermission(`${everyone?.id}`, {
        type: oceanic_js_1.OverwriteTypes.ROLE,
        allow: oceanic_js_1.Permissions.SEND_MESSAGES,
    }).then(async () => {
        interaction.createFollowup({
            content: `🔓 Canal destrancado com sucesso! Use \`\`/lock add\`\` para trancar!`
        });
    }).catch(async () => {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Erro ao destrancar canal!`
        });
    });
});
