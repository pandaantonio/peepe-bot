"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .setRun(async function ({ app, author, guild, interaction }) {
    if (!guild)
        return;
    const reason = interaction.data.options.getString("reason", true);
    // Coletar usuários e remover duplicatas
    const rawUsers = [
        interaction.data.options.getUser("user", true),
        interaction.data.options.getUser("additional_user_1", false),
        interaction.data.options.getUser("additional_user_2", false)
    ].filter((u) => u !== undefined);
    // Remover duplicatas baseado no ID
    const uniqueUsers = rawUsers.filter((user, index, self) => index === self.findIndex((u) => u.id === user.id));
    // Buscar membros (apenas para usuários únicos)
    const members = (await Promise.all(uniqueUsers.map(async (user) => {
        try {
            return await guild.getMember(user.id);
        }
        catch {
            return null;
        }
    }))).filter((m) => m !== null);
    const success = [];
    const failed = [];
    for (const member of members) {
        const username = member.user.globalName ?? member.user.username;
        try {
            // Impedir expulsar a si mesmo
            if (member.id === interaction.user.id) {
                failed.push({ name: `${username} (você mesmo)`, reason: "Não pode expulsar a si mesmo" });
                continue;
            }
            // Impedir expulsar o dono do servidor
            if (member.id === guild.ownerID) {
                failed.push({ name: `${username} (dono do servidor)`, reason: "Não pode expulsar o dono" });
                continue;
            }
            // Verificar hierarquia de cargos (se aplicável)
            const botMember = await guild.getMember(app.user.id);
            const targetMember = member;
            const authorMember = await guild.getMember(author.id);
            if (botMember && targetMember) {
                const botHighestRole = botMember.roles
                    .map(id => guild.roles.get(id))
                    .filter(r => r !== undefined)
                    .sort((a, b) => (b?.position ?? 0) - (a?.position ?? 0))[0];
                const targetHighestRole = targetMember.roles
                    .map(id => guild.roles.get(id))
                    .filter(r => r !== undefined)
                    .sort((a, b) => (b?.position ?? 0) - (a?.position ?? 0))[0];
                if (targetHighestRole && botHighestRole && targetHighestRole.position >= botHighestRole.position) {
                    failed.push({
                        name: username,
                        reason: "Cargo do usuário é igual ou superior ao meu cargo mais alto"
                    });
                    continue;
                }
            }
            await member.kick(reason);
            success.push({ name: username, id: member.id });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            failed.push({ name: username, reason: errorMessage });
        }
    }
    // Construir mensagem de resposta
    const contentParts = [];
    if (success.length) {
        contentParts.push(`# ✅ Expulsões realizadas\n\n${success.map(u => `• ${u.name}`).join("\n")}`);
    }
    if (failed.length) {
        contentParts.push(`# ❌ Expulsões falharam\n\n${failed.map(f => `• ${f.name}\n  └ ${f.reason}`).join("\n")}`);
    }
    // Avisar sobre usuários não encontrados
    if (uniqueUsers.length !== members.length) {
        const notFoundCount = uniqueUsers.length - members.length;
        contentParts.unshift(`⚠️ **${notFoundCount} usuário(s) não está/estão no servidor.**`);
    }
    // Avisar sobre duplicatas
    if (rawUsers.length !== uniqueUsers.length) {
        const duplicatesCount = rawUsers.length - uniqueUsers.length;
        contentParts.unshift(`⚠️ **${duplicatesCount} usuário(s) duplicado(s) foi/foram ignorado(s).**`);
    }
    await interaction.createFollowup({
        content: contentParts.length ? contentParts.join("\n\n") : "Nenhum usuário foi processado."
    });
})
    .setCommand({
    type: 1,
    name: "kick",
    description: "Kick one or more users from the server.",
    descriptionLocalizations: {
        "pt-BR": "Expulsa um ou mais usuários do servidor."
    },
    dmPermission: false,
    defaultMemberPermissions: "2", // KICK_MEMBERS
    options: [
        {
            type: 6,
            name: "user",
            nameLocalizations: {
                "pt-BR": "usuario"
            },
            description: "User to kick.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que será expulso."
            },
            required: true
        },
        {
            type: 3,
            name: "reason",
            nameLocalizations: {
                "pt-BR": "motivo"
            },
            description: "Reason for the kick.",
            descriptionLocalizations: {
                "pt-BR": "Motivo da expulsão."
            },
            required: true,
            maxLength: 512
        },
        {
            type: 6,
            name: "additional_user_1",
            nameLocalizations: {
                "pt-BR": "usuario_adicional_1"
            },
            description: "Additional user to kick.",
            descriptionLocalizations: {
                "pt-BR": "Usuário adicional para expulsar."
            },
            required: false
        },
        {
            type: 6,
            name: "additional_user_2",
            nameLocalizations: {
                "pt-BR": "usuario_adicional_2"
            },
            description: "Additional user to kick.",
            descriptionLocalizations: {
                "pt-BR": "Usuário adicional para expulsar."
            },
            required: false
        }
    ]
});
