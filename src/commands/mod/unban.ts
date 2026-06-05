import Command from "@/struct/command";

export default new Command()
    .setRun(async function ({ guild, interaction }) {
        if (!guild) return;

        const users = [
            interaction.data.options.getUser("user", true),
            interaction.data.options.getUser("additional_user_1", false),
            interaction.data.options.getUser("additional_user_2", false)
        ].filter((u) => u !== undefined);

        const success: string[] = [];
        const failed: string[] = [];

        for (const user of users) {
            try {
                await guild.removeBan(user.id);

                success.push(
                    user.globalName ??
                    user.username
                );
            } catch {
                failed.push(
                    user.globalName ??
                    user.username
                );
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
        name: "unban",
        description: "Unban one or more users from the server.",
        descriptionLocalizations: {
            "pt-BR": "Remove o banimento de um ou mais usuários do servidor."
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
                description: "User to unban.",
                descriptionLocalizations: {
                    "pt-BR": "Usuário que será desbanido."
                },
                required: true
            },
            {
                type: 6,
                name: "additional_user_1",
                nameLocalizations: {
                    "pt-BR": "usuario_adicional_1"
                },
                description: "Additional user to unban.",
                descriptionLocalizations: {
                    "pt-BR": "Usuário adicional para desbanir."
                },
                required: false
            },
            {
                type: 6,
                name: "additional_user_2",
                nameLocalizations: {
                    "pt-BR": "usuario_adicional_2"
                },
                description: "Additional user to unban.",
                descriptionLocalizations: {
                    "pt-BR": "Usuário adicional para desbanir."
                },
                required: false
            }
        ]
    });