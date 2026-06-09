import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("mute remove")

    .setRun(async ({ app, guild, interaction }): Promise<void> => {
        if (!guild) return;

        const res: string[] = [];

        const user1 = interaction.data.options.getUser("user1", true);
        const user2 = interaction.data.options.getUser("user2", false);
        const user3 = interaction.data.options.getUser("user3", false);

        const users = [user1, user2, user3].filter((u) => u !== undefined);

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
                    communicationDisabledUntil: null,
                });

                res.push(
                    `${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` desmutado com sucesso!`
                );
            } catch {
                res.push(
                    `${await app.getMenoji("no")} Erro ao desmutar \`\`${user.globalName ?? user.username}\`\``
                );
            }
        }

        await interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [
                {
                    type: 17,
                    accentColor: 0x3680ff,
                    components: [
                        {
                            type: 10,
                            content: `# 📄 Console de desmute\n\n${res
                                .map((r) => `- ${r}`)
                                .join("\n")}`,
                        },
                    ],
                },
            ],
        });
    });