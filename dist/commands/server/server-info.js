"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("server info")
    .setRun(async function ({ app, author, guild, interaction }) {
    if (!guild)
        return;
    const icon = guild.iconURL();
    const member = await guild.getMember(author.id).catch(() => undefined);
    const stats = [
        `${guild.memberCount} Membros`,
        `${guild.roles.filter((r) => r.managed === false && r.name !== "@everyone").length} Cargos`,
        `${guild.channels.filter((c) => c.type !== 4).length} Canais`,
        `${guild.channels.filter((c) => c.type === 0).length} Canais de texto`,
        `${guild.channels.filter((c) => c.type === 2).length} Canais de voz`
    ];
    const components = [];
    let content = [
        `# ${guild.name}\n`,
        guild.description ? `> ${guild.description}\n` : undefined,
        `${await app.getMenoji("id")} **Id**: \`\`${guild.id}\`\``,
        `${await app.getMenoji("crown")} **Dono(a)**: \`\`${guild.ownerID}\`\``,
        `📊 **Estátisticas**: ${stats.map((s) => `\`\`${s}\`\``).join(", ")}`,
        member && member.joinedAt ? `${await app.getMenoji("join")} **Entrou em**: <t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:R>)` : undefined,
        guild.createdAt ? `${await app.getMenoji("calendar")} **Criado**: <t:${parseInt(`${guild.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${guild.createdAt.getTime() / 1000}`)}:R>)` : undefined,
    ].filter((c) => c !== undefined);
    if (icon) {
        components.push({
            type: 2,
            style: 5,
            url: icon,
            label: "Ícone",
        });
    }
    const container = {
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
        }
        else {
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
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [container, components[0] ? {
                type: 1,
                components,
            } : undefined].filter((c) => c !== undefined),
    });
});
