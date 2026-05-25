"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const UserOption_1 = __importDefault(require("@/options/UserOption"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .setRun(async function ({ app, author, interaction }) {
    const option = interaction.data.options.getUser("user", false) ?? author;
    const snapshot = await firebaseAdmin_1.adminDb.ref(`users/${option.id}`).once('value');
    const data = snapshot.val();
    const coins = data && data.coins ? data.coins : 0;
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 9,
                        components: [{
                                type: 10,
                                content: `**Saldo de**\n-# ${option.globalName ?? option.username}`,
                            }, {
                                type: 10,
                                content: `# ${coins} ${await app.getMenoji("coin")}`
                            }],
                        accessory: {
                            type: 11,
                            media: {
                                url: option.avatarURL(),
                            },
                        },
                    }]
            }],
        allowedMentions: {
            users: false,
        },
    });
})
    .setCommand({
    name: "balance",
    nameLocalizations: {
        "pt-BR": "saldo"
    },
    description: "View a user's balance.",
    descriptionLocalizations: {
        "pt-BR": "Veja o saldo de um usuário"
    },
    options: [(0, UserOption_1.default)(false), (0, EphemeralOption_1.default)(false)],
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
