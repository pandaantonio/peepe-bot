import Command from "@/struct/command";
import { OverwriteTypes, Permissions } from "oceanic.js";

export default new Command()
    .addName("lock add")

    .setRun(async function ({ app, guild, interaction }) {
        if (!guild) return;
        if (!interaction.channel) return;
        if (interaction.channel.type !== 0) return;

        const everyone = guild.roles.find((o) => o.name === "@everyone");

        interaction.channel.editPermission(`${everyone?.id}`, {
            type: OverwriteTypes.ROLE,
            deny: Permissions.SEND_MESSAGES,
        }).then(async () => {
            interaction.createFollowup({
                content: `🔒 Canal trancado com sucesso! Use \`\`/lock remove\`\` para destrancar!`
            });
        }).catch(async () => {
            interaction.createFollowup({
                content: `${await app.getMenoji("no")} Erro ao trancar canal!`
            });
        });
    })