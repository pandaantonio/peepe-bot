import Command from "@/struct/command";
import { OverwriteTypes, Permissions } from "oceanic.js";

export default new Command()
    .addName("lock remove")

    .setRun(async function ({ app, guild, interaction }) {
        if (!guild) return;
        if (!interaction.channel) return;
        if (interaction.channel.type !== 0) return;

        const everyone = guild.roles.find((o) => o.name === "@everyone");

        interaction.channel.editPermission(`${everyone?.id}`, {
            type: OverwriteTypes.ROLE,
            allow: Permissions.SEND_MESSAGES,
        }).then(async () => {
            interaction.createFollowup({
                content: `🔓 Canal destrancado com sucesso! Use \`\`/lock add\`\` para trancar!`
            });
        }).catch(async () => {
            interaction.createFollowup({
                content: `${await app.getMenoji("no")} Erro ao destrancar canal!`
            });
        });
    })