import { ChannelTypes, MessageFlags } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .addName("server info")

    .setRun(async ({ app, guild, author, interaction }) => {
        if(!guild) return;

        const createdAt = parseInt(`${guild.createdAt.getTime() / 1000}`);
        const owner = await app.rest.users.get(`${guild.ownerID}`);
        const member = await guild.getMember(author.id);
        const joinedAt = member.joinedAt ? parseInt(`${member.joinedAt.getTime() / 1000}`) : undefined;

        const icon = guild.iconURL();

        let content: (string | undefined)[] = [
            `> 💼 **Cargos**: \`\`${guild.roles.size}\`\``,
            `> 👥 **Membros**: \`\`${guild.memberCount}\`\``,
            `> ${await app.getMenoji("id")} **ID**: \`\`${guild.id}\`\``,
            `> ${await app.getMenoji("crown")} **Dono(a)**: ${owner.mention}`,
            `> ${await app.getMenoji("calendar")} **Criado**: <t:${createdAt}:d> (<t:${createdAt}:R>)`,
            joinedAt ? `> ${await app.getMenoji("join")} **Entrou em**: <t:${joinedAt}:d> (<t:${joinedAt}:R>)` : undefined
        ];

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${guild.name}**\n\n${guild.description ?? ""}`,
                }, icon ? ({
                    type: 9,
                    components: [{
                        type: 10,
                        content: content
                            .filter((s): s is string => s !== undefined)
                            .sort((a, b) => a.length - b.length)
                            .join("\n")
                    }],
                    accessory: {
                        type: 11,
                        media: {
                            url: icon,
                        },
                    },
                }) :({
                    type: 10,
                    content: content
                        .filter((s): s is string => s !== undefined)
                        .sort((a, b) => a.length - b.length)
                        .join("\n")
                }), {
                    type: 10,
                    content: [
                        `> 📚 **Canais**: \`\`${guild.channels.size}\`\``,
                        `> 📄 **Canais de texto**: \`\`${guild.channels.filter((c) => c.type === ChannelTypes.GUILD_TEXT).length}\`\``,
                        `> 🔊 **Canais de voz**: \`\`${guild.channels.filter((c) => c.type === ChannelTypes.GUILD_VOICE).length}\`\``,
                    ].filter((s): s is string => s !== undefined)
                        .join("\n"),
                }],
            }],
            allowedMentions: {
                users: true,
            },
        });
    });