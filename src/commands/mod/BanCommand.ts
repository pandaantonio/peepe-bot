import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("ban add")

    .setRun(async ({ app, guild, interaction }) => {
        if (!guild) return;

        let res: string[] = [];
        const user1 = interaction.data.options.getUser('user1', true);
        const reason = interaction.data.options.getString("reason", true);

        const user2 = interaction.data.options.getUser('user2', false);
        const user3 = interaction.data.options.getUser('user3', false);

        const users = [user1, user2, user3].filter((u) => u !== undefined);

        for (const user of users) {
            await guild.createBan(user.id, { reason })
                .then(async () => {
                    res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` Banido com sucesso!`);
                })
                .catch(async (e) => {
                    console.log(e);
                    res.push(`${await app.getMenoji("no")} Não foi possivel banir \`\`${user.globalName ?? user.username}\`\`!`)
                });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                accentColor: 0xff1717,
                components: [{
                    type: 10,
                    content: `# 📄 **Console de banimentos**\n\n${res.map((r) => `- ${r}`).join("\n")}`
                }],
            }],
        });
    })

    .setCommand({
        type: 1,
        name: "ban",
        description: "Null",
        dmPermission: false,
        defaultMemberPermissions: "4",
        options: [{
            type: 1,
            name: "add",
            description: "Ban one or more people.",
            descriptionLocalizations: {
                "pt-BR": "Bana uma ou mais pessoas."
            },
            options: [{
                type: 6,
                name: "user1",
                required: true,
                nameLocalizations: {
                    "pt-BR": "usuário1"
                },
                description: "Choose a user.",
                descriptionLocalizations: {
                    "pt-BR": "Escolha um usuário."
                },
            }, {
                type: 3,
                required: true,
                name: "reason",
                nameLocalizations: {
                    "pt-BR": "motivo"
                },
                description: "Reason for ban.",
                descriptionLocalizations: {
                    "pt-BR": "Motivo do banimento."
                },
            }, {
                type: 6,
                name: "user2",
                required: false,
                nameLocalizations: {
                    "pt-BR": "usuário2"
                },
                description: "Choose a user.",
                descriptionLocalizations: {
                    "pt-BR": "Escolha um usuário."
                },
            }, {
                type: 6,
                name: "user3",
                required: false,
                nameLocalizations: {
                    "pt-BR": "usuário3"
                },
                description: "Choose a user.",
                descriptionLocalizations: {
                    "pt-BR": "Escolha um usuário."
                },
            }]
        }, {
            type: 1,
            name: "remove",
            description: "Unban one or more people.",
            descriptionLocalizations: {
                "pt-BR": "Desbanir uma ou mais pessoas."
            },
            options: [{
                type: 6,
                name: "user1",
                required: true,
                nameLocalizations: {
                    "pt-BR": "usuário1"
                },
                description: "Choose a user.",
                descriptionLocalizations: {
                    "pt-BR": "Escolha um usuário."
                },
            }, {
                type: 6,
                name: "user2",
                required: false,
                nameLocalizations: {
                    "pt-BR": "usuário2"
                },
                description: "Choose a user.",
                descriptionLocalizations: {
                    "pt-BR": "Escolha um usuário."
                },
            }, {
                type: 6,
                name: "user3",
                required: false,
                nameLocalizations: {
                    "pt-BR": "usuário3"
                },
                description: "Choose a user.",
                descriptionLocalizations: {
                    "pt-BR": "Escolha um usuário."
                },
            }],
        }],
    });