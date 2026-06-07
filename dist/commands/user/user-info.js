"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const getApp_1 = __importDefault(require("@/utils/getApp"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("user info")
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser('user', false) ?? author;
    const user = await app.rest.users.get(option.id);
    const member = guild ? await guild.getMember(option.id).catch(() => undefined) : undefined;
    const avatar = user.avatarURL();
    const banner = user.bannerURL();
    const avatar2 = member && member.avatarURL() && avatar !== member.avatarURL() ? member.avatarURL() : undefined;
    const banner2 = member && member.bannerURL() && banner !== member.bannerURL() ? member.bannerURL() : undefined;
    const appInfo = user.bot ? await (0, getApp_1.default)(user.id) : undefined;
    console.log(appInfo);
    const components = [{
            type: 2,
            style: 5,
            label: "Perfil",
            url: `https://discord.com/users/${user.id}`
        }, {
            type: 2,
            style: 5,
            label: "Avatar Global",
            url: avatar,
        }];
    const items = [{
            media: {
                url: avatar,
            },
            description: "Avatar Global",
        }];
    const components2 = [];
    if (banner) {
        components.push({
            type: 2,
            style: 5,
            label: "Estandarte Global",
            url: banner,
        });
        items.push({
            media: {
                url: banner,
            },
            description: "Estandarte Global",
        });
    }
    if (avatar2) {
        components.push({
            type: 2,
            style: 5,
            label: "Avatar Local",
            url: avatar2,
        });
        items.push({
            media: {
                url: avatar2,
            },
            description: "Avatar Local",
        });
    }
    if (banner2) {
        components.push({
            type: 2,
            style: 5,
            label: "Estandarte Local",
            url: banner2,
        });
        items.push({
            media: {
                url: banner2,
            },
            description: "Estandarte Local",
        });
    }
    if (appInfo?.terms_of_service_url) {
        components2.push({
            type: 2,
            style: 5,
            label: "Termos de Serviço",
            url: appInfo?.terms_of_service_url,
        });
    }
    if (appInfo?.privacy_policy_url) {
        components2.push({
            type: 2,
            style: 5,
            label: "Politicas de Privacidade",
            url: appInfo?.privacy_policy_url,
        });
    }
    if (appInfo?.custom_install_url) {
        components2.push({
            type: 2,
            style: 5,
            label: "Adicionar ao servidor",
            url: appInfo?.custom_install_url,
        });
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: [
                            appInfo && appInfo.bot_public ? "- **Bot público**" : undefined,
                            appInfo && appInfo.verify_key ? `- **Chave Pública de Verificação de Requisições HTTP**: \`\`${appInfo.verify_key}\`\`` : undefined,
                            appInfo && appInfo.bot_require_code_grant ? "- **Requer Código de Autenticação via OAuth2**" : undefined,
                            user.globalName ? `- **Nome**: \`\`${user.globalName}\`\`` : undefined,
                            member && member.nick ? `- **Apelido**: \`\`${member.nick}\`\`` : undefined,
                            `- **Pomelo**: \`\`${user.username}\`\``,
                            `- **Menção**: \`\`${user.mention}\`\``,
                            `- **Conta criada**: <t:${parseInt(`${user.createdAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${user.createdAt.getTime() / 1000}`)}:R>)`,
                            member && member.joinedAt ? `- **Entrou**: <t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:F> (<t:${parseInt(`${member.joinedAt.getTime() / 1000}`)}:R>)` : undefined,
                        ].filter((c) => c !== undefined).join("\n"),
                    }, {
                        items,
                        type: 12,
                    }]
            }, {
                type: 1,
                components,
            }, components2[0] ? {
                type: 1,
                components: components2,
            } : undefined].filter((c) => c !== undefined),
    });
});
