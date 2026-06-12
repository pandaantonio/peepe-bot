import Command from "@/struct/command";
import { ContainerComponent, MessageActionRowComponent, MessageComponent, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("user info")

    .setRun(async ({ app, guild, author, interaction }) => {
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);

        const avatar = user.avatarURL();
        const banner = user.bannerURL();

        const member = guild ? await guild.getMember(user.id).catch(() => undefined) : undefined;

        const components: MessageActionRowComponent[] = [{
            type: 2,
            style: 5,
            label: "Perfil",
            url: `https://discord.com/users/${user.id}`,
            emoji: { name: "🖼️" },
        }, {
            type: 2,
            style: 5,
            url: avatar,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];
        const avatarLocal = member && member.avatarURL() && member.avatarURL() !== avatar ? member.avatarURL() : undefined;
        const bannerLocal = member && member.bannerURL() && member.bannerURL() !== banner ? member.bannerURL() : undefined;

        const container: ContainerComponent = {
            type: 17,
            components: [{
                type: 9,
                components: [{
                    type: 10,
                    content: [
                        `# ${user.globalName ?? user.username}\n`,
                        `${await app.getMenoji("id")} **Id**: \`\`${user.id}\`\``,
                        `${await app.getMenoji("mention")} **Menção**: \`\`${user.mention}\`\``,
                        `${await app.getMenoji("pomelo")} **Pomelo**: \`\`${user.username}\`\``,
                        `${await app.getMenoji("calendar")} **Conta criada**: <t:${parseInt(`${user.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${user.createdAt.getTime() / 1000}`)}:R>)`
                    ].join("\n"),
                }],
                accessory: {
                    type: 11,
                    media: {
                        url: avatar,
                    },
                },
            }]
        };

        if (member) {
            let content: string[] = [
                member.nick ? `# ${member.nick}\n` : undefined,
                member.joinedAt ? `${await app.getMenoji("join")} **Entrou em**: <t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:R>)` : undefined,
            ].filter((c) => c !== undefined);

            if (avatarLocal) {
                components.push({
                    type: 2,
                    style: 5,
                    url: avatarLocal,
                    label: "Avatar Local",
                    emoji: await app.getButoji("download"),
                });
            }

            if (content[0]) {
                container.components.push(avatarLocal ? ({
                    type: 9,
                    components: [{
                        type: 10,
                        content: content.join("\n"),
                    }],
                    accessory: {
                        type: 11,
                        media: {
                            url: avatarLocal,
                        },
                    },
                }) : ({
                    type: 10,
                    content: content.join("\n"),
                }));
            }
        }

        if (banner) {
            container.components.push({
                type: 12,
                items: [{
                    media: {
                        url: banner,
                    },
                    description: "Estandarte Global",
                }],
            });

            components.push({
                type: 2,
                style: 5,
                url: banner,
                label: "Estandarte Global",
                emoji: await app.getButoji("download"),
            });
        }

        if (bannerLocal) {
            const c1 = container.components.find((c) => c.type === 12);

            if (!c1) {
                container.components.push({
                    type: 12,
                    items: [{
                        media: {
                            url: bannerLocal,
                        },
                        description: "Estandarte Local"
                    }]
                });
            } else {
                c1.items.push({
                    media: {
                        url: bannerLocal,
                    },
                    description: "Estandarte Local"
                });
            }

            components.push({
                type: 2,
                style: 5,
                url: bannerLocal,
                label: "Estandarte Local",
                emoji: await app.getButoji("download"),
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [container, {
                type: 1,
                components,
            }],
        });
    });