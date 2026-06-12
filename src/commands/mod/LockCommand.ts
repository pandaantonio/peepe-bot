import Command from "@/struct/command";
import { OverwriteTypes, Permissions } from "oceanic.js";

export default new Command()
    .addName("lock add")

    .setRun(async function ({ app, guild, interaction }) {
        if (!guild) return;
        if (!interaction.channel) return;
        if (interaction.channel.type !== 0) return;

        if(!interaction.channel.permissionsOf(app.user.id).has("MANAGE_CHANNELS")){
            interaction.createFollowup({
                content: `${await app.getMenoji("no")} É Necessário eu ter a permissão de gerenciar canal.`
            });
            
            return;
        }

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

    .setCommand({
        type: 1,
        name: "lock",
        description: "Null",
        dmPermission: false,
        defaultMemberPermissions: "16",
        options: [{
            type: 1,
            name: "add",
            description: "Block channel from receiving new messages from regular members.",
            descriptionLocalizations: {
                "pt-BR": "Impedir que o canal receba novas mensagens de membros regulares."
            },
        }, {
            type: 1,
            name: "remove",
            description: "Unlock channel so regular members can post messages.",
            descriptionLocalizations: {
                "pt-BR": "Desbloqueie o canal para que membros regulares possam postar mensagens."
            },
        }],
    });