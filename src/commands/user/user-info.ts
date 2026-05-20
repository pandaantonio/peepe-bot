import { MessageFlags } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .addName("user info")

    .setRun(async function({ app, guild, author, interaction }){
        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const createdAt = parseInt(`${user.createdAt.getTime() / 1000}`);

        const member = await guild?.getMember(option.id);
        const joinedAt = member && member.joinedAt ?
            parseInt(`${member.joinedAt.getTime() / 1000}`) :
            undefined;

        let content: (string | undefined)[] = [
            `**${user.globalName ?? user.username}**\n`,
            `> ${await app.getMenoji("pomelo")} **Nome**: \`\`${user.username}\`\``,
            member && member.nick ?
                `> 📌 **Apelido**: \`\`${member.nick}\`\``
                : undefined,
            `> ${await app.getMenoji("id")} **ID**: \`\`${user.id}\`\``,
            `> ${await app.getMenoji("mention")} **Menção**: \`\`${user.mention}\`\``,
            `> ${await app.getMenoji("calendar")} **Conta criada**: <t:${createdAt}:f> (<t:${createdAt}:R>)`,
            member && member.joinedAt ? 
                `> ${await app.getMenoji("calendar")} **Entrou em**: <t:${joinedAt}:f> (<t:${joinedAt}:R>)`
                : undefined
        ];

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: content.filter((c) => c !== undefined).join("\n")
                }]
            }],
        });
    });