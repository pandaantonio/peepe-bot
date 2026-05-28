"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .setRun(async function ({ app, guild, interaction }) {
    const dashboard = guild ? `${process.env.WEBSITE}/dashboard/${guild.id}` : `${process.env.WEBSITE}/dashboard`;
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: dashboard,
                        label: "Painel de controle",
                        emoji: await app.getButoji("config"),
                    }],
            }]
    });
})
    .setCommand({
    name: "dashboard",
    nameLocalizations: {
        "pt-BR": "painel",
    },
    description: "Access the bot's control panel.",
    descriptionLocalizations: {
        "pt-BR": "Acesse o painel de controle do bot.",
    },
    integrationTypes: [
        oceanic_js_1.ApplicationIntegrationTypes.GUILD_INSTALL,
        oceanic_js_1.ApplicationIntegrationTypes.USER_INSTALL,
    ],
    contexts: [
        oceanic_js_1.InteractionContextTypes.BOT_DM,
        oceanic_js_1.InteractionContextTypes.GUILD,
        oceanic_js_1.InteractionContextTypes.PRIVATE_CHANNEL,
    ],
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
