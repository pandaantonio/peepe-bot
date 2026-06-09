import Command from "@/struct/command";
import { ContainerComponent, MessageActionRowComponent, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("server info")

    .setRun(async function ({ app, author, guild, interaction }) {
        if (!guild) return;

        const icon = guild.iconURL();
        const member = await guild.getMember(author.id).catch(() => undefined);

        const components: MessageActionRowComponent[] = [];
        let content: string[] = [
            `# ${guild.name}\n`,
            guild.description ? `> ${guild.description}\n` : undefined,
            `- **Id**: \`\`${guild.id}\`\``,
            `- **Dono(a)**: \`\`${guild.ownerID}\`\``,
            `- **Total de membros**: \`\`${guild.memberCount}\`\``,
            `- **Total de cargos**: \`\`${guild.roles.size}\`\``,
            `- **Total de canais**: \`\`${guild.channels.filter((c) => c.type !== 4).length}\`\``,
            `> **Texto**: \`\`${guild.channels.filter((c) => c.type === 0).length}\`\``,
            `> **Voz**: \`\`${guild.channels.filter((c) => c.type === 2).length}\`\``,
            member && member.joinedAt ? `- **Entrou em**: <t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:R>)` : undefined,
            guild.createdAt ? `- **Criado**: <t:${parseInt(`${guild.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${guild.createdAt.getTime() / 1000}`)}:R>)` : undefined,
        ].filter((c) => c !== undefined);

        if (icon) {
            components.push({
                type: 2,
                style: 5,
                url: icon,
                label: "Ícone",
            });
        }

        const container: ContainerComponent = {
            type: 17,
            components: [icon ? ({
                type: 9,
                components: [{
                    type: 10,
                    content: content.join("\n"),
                }],
                accessory: {
                    type: 11,
                    media: {
                        url: icon,
                    }
                },
            }) : {
                type: 10,
                content: content.join("\n"),
            }],
        };

        const banner = guild.bannerURL();
        const splash = guild.splashURL();

        if (banner) {
            container.components.push({
                type: 12,
                items: [{
                    media: {
                        url: banner,
                    },
                    description: "Estandarte"
                }]
            });

            components.push({
                type: 2,
                style: 5,
                url: banner,
                label: "Estandarte",
            });
        }

        if (splash) {
            const c1 = container.components.find((c) => c.type === 12);

            if (!c1) {
                container.components.push({
                    type: 12,
                    items: [{
                        media: {
                            url: splash,
                        },
                        description: "Fundo de Convite"
                    }]
                });
            } else {
                c1.items.push({
                    media: {
                        url: splash,
                    },
                    description: "Fundo de Convite"
                });
            }

            components.push({
                type: 2,
                style: 5,
                url: splash,
                label: "Fundo de Convite",
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [container, components[0] ? {
                type: 1,
                components,
            } : undefined].filter((c) => c !== undefined),
        });
    });