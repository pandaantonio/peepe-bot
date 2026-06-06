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
    const duration = interaction.data.options.getString("duration", true);
    // Converter duração para milissegundos
    const durationMs = parseDuration(duration);
    if (durationMs === null) {
        await interaction.createFollowup({
            content: "❌ Formato de duração inválido. Use formatos como: `30m`, `1h`, `2d`, `1h30m`, etc."
        });
        return;
    }
    // Limite máximo do Discord é 28 dias (2419200000 ms)
    if (durationMs > 28 * 24 * 60 * 60 * 1000) {
        await interaction.createFollowup({
            content: "❌ O timeout não pode exceder 28 dias."
        });
        return;
    }
    // Mínimo de 1 segundo
    if (durationMs < 1000) {
        await interaction.createFollowup({
            content: "❌ O timeout deve ser de no mínimo 1 segundo."
        });
        return;
    }
    // Coletar usuários e remover duplicatas
    const rawUsers = [
        interaction.data.options.getUser("user", true),
        interaction.data.options.getUser("additional_user_1", false),
        interaction.data.options.getUser("additional_user_2", false)
    ].filter((u) => u !== undefined);
    // Remover duplicatas baseado no ID
    const uniqueUsers = rawUsers.filter((user, index, self) => index === self.findIndex((u) => u.id === user.id));
    // Buscar membros
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
    // Buscar membros do bot e do autor uma vez fora do loop
    const botMember = await guild.getMember(app.user.id);
    const authorMember = await guild.getMember(author.id);
    // Função auxiliar para obter o cargo mais alto de um membro
    const getHighestRole = (member) => {
        const roles = member.roles
            .map((id) => guild.roles.get(id))
            .filter((r) => r !== undefined)
            .sort((a, b) => (b?.position ?? 0) - (a?.position ?? 0));
        return roles[0] || null;
    };
    const botHighestRole = getHighestRole(botMember);
    const authorHighestRole = getHighestRole(authorMember);
    const timeoutUntil = new Date(Date.now() + durationMs);
    const timeoutUntilISO = timeoutUntil.toISOString();
    for (const member of members) {
        const username = member.user.globalName ?? member.user.username;
        try {
            // Impedir mutar a si mesmo
            if (member.id === interaction.user.id) {
                failed.push({ name: `${username} (você mesmo)`, reason: "Não pode mutar a si mesmo" });
                continue;
            }
            // Impedir mutar o dono do servidor
            if (member.id === guild.ownerID) {
                failed.push({ name: `${username} (dono do servidor)`, reason: "Não pode mutar o dono" });
                continue;
            }
            // Verificar hierarquia de cargos do bot
            if (botMember && member) {
                const targetHighestRole = getHighestRole(member);
                if (targetHighestRole && botHighestRole && targetHighestRole.position >= botHighestRole.position) {
                    failed.push({
                        name: username,
                        reason: "Cargo do usuário é igual ou superior ao meu cargo mais alto"
                    });
                    continue;
                }
            }
            // Verificar hierarquia de cargos do autor (quem está executando o comando)
            if (authorMember && member && authorMember.id !== guild.ownerID) {
                const targetHighestRole = getHighestRole(member);
                if (targetHighestRole && authorHighestRole && targetHighestRole.position >= authorHighestRole.position) {
                    failed.push({
                        name: username,
                        reason: "Cargo do usuário é igual ou superior ao seu cargo mais alto"
                    });
                    continue;
                }
            }
            // Aplicar timeout
            await member.edit({
                communicationDisabledUntil: timeoutUntilISO,
                reason: reason
            });
            success.push({ name: username, until: timeoutUntil });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            failed.push({ name: username, reason: errorMessage });
        }
    }
    // Construir mensagem de resposta
    const contentParts = [];
    if (success.length) {
        contentParts.push(`# ✅ Timeout aplicado\n\n${success.map(u => `• ${u.name} até <t:${Math.floor(u.until.getTime() / 1000)}:R>`).join("\n")}`);
    }
    if (failed.length) {
        contentParts.push(`# ❌ Timeout falhou\n\n${failed.map(f => `• ${f.name}\n  └ ${f.reason}`).join("\n")}`);
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
    name: "mute",
    nameLocalizations: {
        "pt-BR": "mutar"
    },
    description: "Timeout one or more users from the server.",
    descriptionLocalizations: {
        "pt-BR": "Aplica timeout em um ou mais usuários do servidor."
    },
    dmPermission: false,
    defaultMemberPermissions: "32", // MODERATE_MEMBERS
    options: [
        {
            type: 6,
            name: "user",
            nameLocalizations: {
                "pt-BR": "usuario"
            },
            description: "User to timeout.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que receberá timeout."
            },
            required: true
        },
        {
            type: 3,
            name: "duration",
            nameLocalizations: {
                "pt-BR": "duracao"
            },
            description: "Timeout duration (e.g., 30m, 1h, 2d, 1h30m).",
            descriptionLocalizations: {
                "pt-BR": "Duração do timeout (ex: 30m, 1h, 2d, 1h30m)."
            },
            required: true,
            maxLength: 20
        },
        {
            type: 3,
            name: "reason",
            nameLocalizations: {
                "pt-BR": "motivo"
            },
            description: "Reason for the timeout.",
            descriptionLocalizations: {
                "pt-BR": "Motivo do timeout."
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
            description: "Additional user to timeout.",
            descriptionLocalizations: {
                "pt-BR": "Usuário adicional para timeout."
            },
            required: false
        },
        {
            type: 6,
            name: "additional_user_2",
            nameLocalizations: {
                "pt-BR": "usuario_adicional_2"
            },
            description: "Additional user to timeout.",
            descriptionLocalizations: {
                "pt-BR": "Usuário adicional para timeout."
            },
            required: false
        }
    ]
});
// Função para converter duração (ex: "1h30m") para milissegundos
function parseDuration(duration) {
    const regex = /(\d+(?:\.\d+)?)([smhd])/g;
    let match;
    let totalMs = 0;
    const units = {
        's': 1000,
        'm': 60 * 1000,
        'h': 60 * 60 * 1000,
        'd': 24 * 60 * 60 * 1000
    };
    while ((match = regex.exec(duration)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        if (isNaN(value))
            return null;
        totalMs += value * units[unit];
    }
    return totalMs > 0 ? totalMs : null;
}
