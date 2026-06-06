import Command from "@/struct/command";

export default new Command()
    .setRun(async function ({ guild, interaction }) {
        if (!guild) return;

        // Coletar usuários e remover duplicatas
        const rawUsers = [
            interaction.data.options.getUser("user", true),
            interaction.data.options.getUser("additional_user_1", false),
            interaction.data.options.getUser("additional_user_2", false)
        ].filter((u): u is NonNullable<typeof u> => u !== undefined);

        // Remover duplicatas baseado no ID
        const uniqueUsers = rawUsers.filter(
            (user, index, self) => 
                index === self.findIndex((u) => u.id === user.id)
        );

        const success: string[] = [];
        const failed: Array<{ name: string; reason: string }> = [];

        for (const user of uniqueUsers) {
            const userName = user.globalName ?? user.username;

            try {
                await guild.removeBan(user.id);
                success.push(userName);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
                failed.push({ name: userName, reason: errorMessage });
            }
        }

        // Construir mensagem de resposta
        const contentParts = [];

        if (success.length) {
            contentParts.push(
                `# ✅ Desbanimentos realizados\n\n${success.map(u => `• ${u}`).join("\n")}`
            );
        }

        if (failed.length) {
            contentParts.push(
                `# ❌ Desbanimentos falharam\n\n${failed.map(f => `• ${f.name}\n  └ ${f.reason}`).join("\n")}`
            );
        }

        // Avisar sobre duplicatas
        if (rawUsers.length !== uniqueUsers.length) {
            const duplicatesCount = rawUsers.length - uniqueUsers.length;
            contentParts.unshift(
                `⚠️ **${duplicatesCount} usuário(s) duplicado(s) foi/foram ignorado(s).**`
            );
        }

        await interaction.createFollowup({
            content: contentParts.length ? contentParts.join("\n\n") : "Nenhum usuário foi processado."
        });
    })

    .setCommand({
        type: 1,
        name: "unban",
        nameLocalizations: {
            "pt-BR": "desbanir"
        },
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