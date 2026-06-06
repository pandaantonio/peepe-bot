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
    // Coletar usuários e remover duplicatas (comparando por ID)
    const rawUsers = [
        interaction.data.options.getUser("user", true),
        interaction.data.options.getUser("additional_user_1", false),
        interaction.data.options.getUser("additional_user_2", false)
    ].filter((u) => u !== undefined);
    // Remover duplicatas baseado no ID
    const uniqueUsers = rawUsers.filter((user, index, self) => index === self.findIndex((u) => u.id === user.id));
    const success = [];
    const failed = [];
    for (const user of uniqueUsers) {
        const userName = user.globalName ?? user.username;
        const member = await guild.getMember(user.id).catch(() => undefined);
        try {
            // Impedir banir a si mesmo
            if (user.id === interaction.user.id) {
                failed.push({ name: `${userName} (você mesmo)`, reason: "Não pode banir a si mesmo" });
                continue;
            }
            // Impedir banir o dono do servidor
            if (user.id === guild.ownerID) {
                failed.push({ name: `${userName} (dono do servidor)`, reason: "Não pode banir o dono" });
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
                        name: `${userName}`,
                        reason: "Cargo do usuário é igual ou superior ao meu cargo mais alto"
                    });
                    continue;
                }
            }
            await guild.createBan(user.id, { reason });
            success.push(userName);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            failed.push({ name: userName, reason: errorMessage });
        }
    }
    // Construir mensagem de resposta
    const contentParts = [];
    if (success.length) {
        contentParts.push(`# ✅ Banimentos realizados\n\n${success.map(u => `• ${u}`).join("\n")}`);
    }
    if (failed.length) {
        contentParts.push(`# ❌ Banimentos falharam\n\n${failed.map(f => `• ${f.name}\n  └ ${f.reason}`).join("\n")}`);
    }
    // Avisar sobre duplicatas removidas
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
    name: "ban",
    description: "Ban one or more users from the server.",
    descriptionLocalizations: {
        "pt-BR": "Bane um ou mais usuários do servidor."
    },
    dmPermission: false,
    defaultMemberPermissions: "4", // BAN_MEMBERS
    options: [
        {
            type: 6,
            name: "user",
            nameLocalizations: {
                "pt-BR": "usuario"
            },
            description: "User to ban.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que será banido."
            },
            required: true
        },
        {
            type: 3,
            name: "reason",
            nameLocalizations: {
                "pt-BR": "motivo"
            },
            description: "Reason for the ban.",
            descriptionLocalizations: {
                "pt-BR": "Motivo do banimento."
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
            description: "Additional user to ban.",
            descriptionLocalizations: {
                "pt-BR": "Usuário adicional para banir."
            },
            required: false
        },
        {
            type: 6,
            name: "additional_user_2",
            nameLocalizations: {
                "pt-BR": "usuario_adicional_2"
            },
            description: "Additional user to ban.",
            descriptionLocalizations: {
                "pt-BR": "Usuário adicional para banir."
            },
            required: false
        },
    ]
});
