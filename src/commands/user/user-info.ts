import { MessageActionRowComponent, MessageFlags } from "oceanic.js";
import Command from "@/struct/command";
import getApp from "@/utils/getApp";

export default new Command()
    .addName("user info")

    .setRun(async function({ app, guild, author, interaction }){
        const option = interaction.data.options.getUser("user", false) ?? author;
        const user = await app.rest.users.get(option.id);
        const createdAt = parseInt(`${user.createdAt.getTime() / 1000}`);

        const member = await guild?.getMember(option.id).catch(() => undefined);
        const joinedAt = member && member.joinedAt ?
            parseInt(`${member.joinedAt.getTime() / 1000}`) :
            undefined;

        const avatar = user.avatarURL();
        const banner = user.bannerURL();

        const avatarLocal = member?.avatarURL();
        const bannerLocal = member?.bannerURL();

        const bot = user.bot ? await getApp(user.id) : undefined;

        let content: (string | undefined)[] = [
            `**${user.globalName ?? user.username}**\n`,
            bot && bot.description ? `\n${bot.description}\n\n` : undefined,
            `> ${await app.getMenoji("pomelo")} **Nome**: \`\`${user.username}\`\``,
            member && member.nick ?
                `> 📌 **Apelido**: \`\`${member.nick}\`\``
                : undefined,
            `> ${await app.getMenoji("id")} **ID**: \`\`${user.id}\`\``,
            `> ${await app.getMenoji("mention")} **Menção**: \`\`${user.mention}\`\``,
            `> ${await app.getMenoji("calendar")} **Conta criada**: <t:${createdAt}:f> (<t:${createdAt}:R>)`,
            member && member.joinedAt ? 
                `> ${await app.getMenoji("join")} **Entrou em**: <t:${joinedAt}:f> (<t:${joinedAt}:R>)`
                : undefined,
            bot ?
                [`\n> ${await app.getMenoji("bot")} **Sobre o bot**:`,
                `- ${bot.bot_public ? await app.getMenoji("yes") : await app.getMenoji("no")} Público`,
                `- ${bot.bot_require_code_grant ? await app.getMenoji("yes") : await app.getMenoji("no")} Requer Código de Autenticação via OAuth2`
                ].join("\n") : undefined
        ];

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 9,
                    components: [{
                        type: 10,
                        content: content.filter((c) => c !== undefined).join("\n")
                    }],
                    accessory: {
                        type: 11,
                        media: {
                            url: avatar,
                        },
                    },
                }]
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    label: "Perfil",
                    emoji: await app.getButoji("link"),
                    url: `https://discord.com/users/${user.id}`,
                }, {
                    type: 2,
                    style: 5,
                    url: avatar,
                    label: "Avatar Global",
                    emoji: await app.getButoji("download"),
                }, banner ? {
                    type: 2,
                    style: 5,
                    url: avatar,
                    label: "Estandarte Global",
                    emoji: await app.getButoji("download"),
                }   : undefined, member && avatarLocal && avatarLocal !== avatar ? {
                    type: 2,
                    style: 5,
                    url: avatarLocal,
                    label: "Avatar Local",
                    emoji: await app.getButoji("download"),
                }: undefined, member && bannerLocal && bannerLocal !== banner ? {
                    type: 2,
                    style: 5,
                    url: bannerLocal,
                    label: "Estandarte Local",
                    emoji: await app.getButoji("download"),
                } : undefined].filter((c) => c !== undefined),
            }],
        });
    });