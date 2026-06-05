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
    const selectedUsers = [
        interaction.data.options.getUser("user", true),
        interaction.data.options.getUser("additional_user_1", false),
        interaction.data.options.getUser("additional_user_2", false)
    ].filter((u) => u !== undefined);
    const members = (await Promise.all(selectedUsers.map(async (user) => {
        try {
            return await guild.getMember(user.id);
        }
        catch {
            return undefined;
        }
    }))).filter((u) => u !== undefined);
    const success = [];
    const failed = [];
    for (const member of members) {
        const username = member.user.globalName ??
            member.user.username;
        try {
            if (member.id === interaction.user.id) {
                failed.push(`${username} (você mesmo)`);
                continue;
            }
            if (member.id === guild.ownerID) {
                failed.push(`${username} (dono do servidor)`);
                continue;
            }
            await member.kick(reason);
            success.push(username);
        }
        catch {
            failed.push(username);
        }
    }
    const content = [
        success.length > 0
            ? `# ✅ Expulsões realizadas\n\n${success.map(user => `• ${user}`).join("\n")}`
            : null,
        failed.length > 0
            ? `# ❌ Expulsões falharam\n\n${failed.map(user => `• ${user}`).join("\n")}`
            : null
    ]
        .filter(Boolean)
        .join("\n\n");
    await interaction.createFollowup({
        content: content || "Nenhum usuário foi processado."
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
