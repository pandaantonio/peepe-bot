"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .setRun(async function ({ guild, interaction }) {
    if (!guild)
        return;
    const reason = interaction.data.options.getString("reason", true);
    const users = [
        interaction.data.options.getUser("user", true),
        interaction.data.options.getUser("additional_user_1", false),
        interaction.data.options.getUser("additional_user_2", false)
    ].filter((u) => u !== undefined);
    const success = [];
    const failed = [];
    for (const user of users) {
        try {
            await guild.createBan(user.id, { reason });
            success.push(user.globalName ??
                user.username);
        }
        catch {
            failed.push(user.globalName ??
                user.username);
        }
    }
    const content = [
        success.length
            ? `# ✅ Sucesso\n\n${success.map(u => `• ${u}`).join("\n")}`
            : null,
        failed.length
            ? `# ❌ Falha\n\n${failed.map(u => `• ${u}`).join("\n")}`
            : null
    ]
        .filter(Boolean)
        .join("\n\n");
    await interaction.createFollowup({
        content
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
        {
            type: 4,
            name: "delete_days",
            nameLocalizations: {
                "pt-BR": "apagar_dias"
            },
            description: "Delete recent messages from the banned users.",
            descriptionLocalizations: {
                "pt-BR": "Apagar mensagens recentes dos usuários."
            },
            required: false,
            minValue: 0,
            maxValue: 7
        }
    ]
});
