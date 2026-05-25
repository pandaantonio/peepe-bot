"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .setRun(async function ({ app, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const snapshot = await firebaseAdmin_1.adminDb.ref(`users/${option.id}`).once('value');
    const data = snapshot.val();
    const nextDaily = new Date(data.lastClaimed).getTime() + 24 * 60 * 60 * 1000;
    const timestamp = Math.floor(nextDaily / 1000);
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 10,
                content: `⏰ **Próximo resgate em**: <t:${timestamp}:R>`
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        label: "Resgatar recompeça diária",
                        url: `${process.env.WEBSITE}/daily`,
                        emoji: { name: "🎁" },
                    }],
            }]
    });
})
    .setCommand({
    name: "daily",
    description: "Claim your daily reward.",
    descriptionLocalizations: {
        "pt-BR": "Resgate sua recompeça diária."
    },
    options: [(0, EphemeralOption_1.default)(false)],
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
