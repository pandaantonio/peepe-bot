import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("ban")

    .setRun(async ({ app, guild, interaction }) => {
        if(!guild) return;

        let res: string[] = [];
        const user1 = interaction.data.options.getUser('user1', true);
        const reason = interaction.data.options.getString("reason", true);

        const user2 = interaction.data.options.getUser('user2', true);
        const user3 = interaction.data.options.getUser('user3', true);

        const users = [user1, user2, user3].filter((u) => u !== undefined);

        for(const user of users){
            await guild.createBan(user.id, { reason })
                .then(async () => {
                    res.push(`${await app.getMenoji("yes")} \`\`${user.globalName ?? user.username}\`\` Banido com sucesso!`);
                })
                .catch(async (e) => {
                    console.log(e);
                    res.push(`${await app.getMenoji("no")} Não foi possivel banir \`\`${user.globalName ?? user.username}\`\`!`)
                });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                accentColor: 0xff3515,
                components: [{
                    type: 10,
                    content: `# 📄 **Console de banimentos**\n\n${res.map((r) => `- ${r}`).join("\n")}`
                }],
            }],
        });
    });