"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const timeoutUtil_1 = __importDefault(require("@/utils/timeoutUtil"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("mute add")
    .setRun(async ({ app, guild, interaction }) => {
    if (!guild)
        return;
    if (!guild.permissionsOf(app.user.id).has("MODERATE_MEMBERS")) {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} É Necessário eu ter a permissão de moderar membros.`
        });
        return;
    }
    const res = [];
    const user1 = interaction.data.options.getUser("user1", true);
    const user2 = interaction.data.options.getUser("user2", false);
    const user3 = interaction.data.options.getUser("user3", false);
    const users = [user1, user2, user3].filter((u) => u !== undefined);
    const time = interaction.data.options.getString("time", true);
    const duration = (0, timeoutUtil_1.default)(time);
    if (!duration) {
        await interaction.createFollowup({
            content: "❌ Tempo inválido! Exemplos: `5s`, `10m`, `1h`, `7d`, `1h30m`",
        });
        return;
    }
    const maxTimeout = 28 * 24 * 60 * 60 * 1000;
    if (duration > maxTimeout) {
        await interaction.createFollowup({
            content: "❌ O timeout máximo permitido é de **28 dias**.",
        });
        return;
    }
    const timeoutUntil = new Date(Date.now() + duration).toISOString();
    for (const user of users) {
        try {
            const member = await guild.getMember(user.id);
            if (!member) {
                res.push(`⚠️ \`\`${user.globalName ?? user.username}\`\` não está no servidor`);
                continue;
            }
            await member.edit({
                communicationDisabledUntil: timeoutUntil,
            });
            res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` mutado com sucesso!`);
        }
        catch {
            res.push(`${await app.getMenoji("no")} Erro ao mutar \`\`${user.globalName ?? user.username}\`\``);
        }
    }
    await interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [
            {
                type: 17,
                accentColor: 0xff3b15,
                components: [
                    {
                        type: 10,
                        content: `# 📄 Console de mute\n\n${res
                            .map((r) => `- ${r}`)
                            .join("\n")}`,
                    },
                ],
            },
        ],
    });
})
    .setCommand({
    type: 1,
    name: "mute",
    description: "null",
    dmPermission: false,
    defaultMemberPermissions: "1099511627776",
    options: [{
            type: 1,
            name: "add",
            description: "Mute one or more people.",
            descriptionLocalizations: {
                "pt-BR": "Mutar uma ou mais pessoas."
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
                    name: "time",
                    nameLocalizations: {
                        "pt-BR": "tempo"
                    },
                    description: "Mute time.",
                    descriptionLocalizations: {
                        "pt-BR": "Tempo do mute."
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
            description: "Unmute one or more people.",
            descriptionLocalizations: {
                "pt-BR": "Desmutar uma ou mais pessoas."
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
