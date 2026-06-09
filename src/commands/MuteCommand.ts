import Command from "@/struct/command";
import timeoutUtil from "@/utils/timeoutUtil";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("mute")
    .setRun(async ({ app, guild, interaction }): Promise<void> => {
        if (!guild) return;

        await interaction.defer();

        const res: string[] = [];

        const user1 = interaction.data.options.getUser("user1", true);
        const user2 = interaction.data.options.getUser("user2", false);
        const user3 = interaction.data.options.getUser("user3", false);

        const users = [user1, user2, user3].filter((u) => u !== undefined);

        const time = interaction.data.options.getString("time", true);

        const duration = timeoutUtil(time);

        if (!duration) {
            await interaction.createFollowup({
                content:
                    "❌ Tempo inválido! Exemplos: `5s`, `10m`, `1h`, `7d`, `1h30m`",
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
                    res.push(
                        `⚠️ \`\`${user.globalName ?? user.username}\`\` não está no servidor`
                    );
                    continue;
                }

                await member.edit({
                    communicationDisabledUntil: timeoutUntil,
                });

                res.push(
                    `${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` mutado com sucesso!`
                );
            } catch {
                res.push(
                    `${await app.getMenoji("no")} Erro ao mutar \`\`${user.globalName ?? user.username}\`\``
                );
            }
        }

        await interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [
                {
                    type: 17,
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
    });