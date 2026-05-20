import { MessageFlags } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .addName("server info")

    .setRun(async ({ app, guild, author, interaction }) => {
        if(!guild) return;

        const createdAt = parseInt(`${guild.createdAt.getTime() / 1000}`);
        const owner = await app.rest.users.get(`${guild.ownerID}`);
        const member = await guild.getMember(author.id);
        const joinedAt = member.joinedAt ? parseInt(`${member.joinedAt.getTime() / 1000}`) : undefined;

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${guild.name}**\n\n${guild.description ?? ""}`,
                }, {
                    type: 10,
                    content: [
                        `> 👥 **Membros**: \`\`${guild.memberCount}\`\``,
                        `> ${await app.getMenoji("id")} **ID**: \`\`${guild.id}\`\``,
                        `> ${await app.getMenoji("crown")} **Dono(a)**: ${owner.mention}`,
                        `> ${await app.getMenoji("calendar")} **Criado**: <t:${createdAt}:f> (<t:${createdAt}:R>)`,
                        joinedAt ? `> ${await app.getMenoji("join")} **Entrou em**: <t:${joinedAt}:f> (<t:${joinedAt}:R>)` : undefined
                    ].filter((s) => s !== undefined).join("\n"),
                }],
            }],
            allowedMentions: {
                users: true,
            },
        });
    });