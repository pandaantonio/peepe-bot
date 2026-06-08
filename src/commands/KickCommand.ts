import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("kick")

    .setRun(async ({ app, guild, interaction }) => {
        if (!guild) return;

        let res: string[] = [];
        const user1 = interaction.data.options.getUser('user1', true);
        const reason = interaction.data.options.getString("reason", true);

        const user2 = interaction.data.options.getUser('user2', false);
        const user3 = interaction.data.options.getUser('user3', false);

        const users = [user1, user2, user3].filter((u) => u !== undefined);

        for (const user of users) {
            const member = await guild.getMember(user.id).catch(() => undefined);

            if (member) {
                await member.kick(reason)
                    .then(async () => {
                        res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` Expulso com sucesso!`);
                    })
                    .catch(async (e) => {
                        console.log(e);
                        res.push(`${await app.getMenoji("no")} Não foi possivel expulsar \`\`${user.globalName ?? user.username}\`\`!`)
                    });
            } else {
                res.push(`⚠️ \`\`${user.globalName ?? user.username}\`\` Não pertece á esse servidor!`);
            }
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# 📄 **Console de expulsões**\n\n${res.map((r) => `- ${r}`).join("\n")}`
                }],
            }],
        });
    });