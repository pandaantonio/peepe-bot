import Command from "@/struct/command";
import { ContainerComponent, MessageActionRowComponent, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("server info")

    .setRun(async function ({ app, author, guild, interaction }) {
        if (!guild) return;

        const icon = guild.iconURL();
        const member = await guild.getMember(author.id).catch(() => undefined);
        const owner = await guild.getMember(`${guild.ownerID}`).catch(() => undefined);
        const stats = [
            `${guild.memberCount} Membros`,
            `${guild.roles.filter((r) => r.managed === false && r.name !== "@everyone").length} Cargos`,
            `${guild.channels.filter((c) => c.type !== 4).length} Canais`,
            `${guild.channels.filter((c) => c.type === 0).length} Canais de texto`,
            `${guild.channels.filter((c) => c.type === 2).length} Canais de voz`
        ];

        const components: MessageActionRowComponent[] = [];
        let content: string[] = [
            `# ${guild.name}\n`,
            guild.description ? `> ${guild.description}\n` : undefined,
            `${await app.getMenoji("id")} **Id**: \`\`${guild.id}\`\``,
            `${await app.getMenoji("crown")} **Dono(a)**: \`\`${owner?.nick ?? owner?.user.globalName ?? owner?.user.username}\`\` (\`\`${guild.ownerID}\`\`)`,
            `📊 **Estátisticas**: ${stats.map((s) => `\`\`${s}\`\``).join(", ")}`,
            member && member.joinedAt ? `${await app.getMenoji("event")} **Entrou em**: <t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:R>)` : undefined,
            guild.createdAt ? `${await app.getMenoji("calendar")} **Criado**: <t:${parseInt(`${guild.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${guild.createdAt.getTime() / 1000}`)}:R>)` : undefined,
        ].filter((c) => c !== undefined);

        if (icon) {
            components.push({
                type: 2,
                style: 5,
                url: icon,
                label: "Ícone",
                emoji: await app.getButoji("download"),
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
                emoji: await app.getButoji("download"),
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
                emoji: await app.getButoji("download"),
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