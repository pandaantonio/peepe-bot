"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EphemeralOption_1 = __importDefault(require("@/options/EphemeralOption"));
const UserOption_1 = __importDefault(require("@/options/UserOption"));
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .setRun(async function ({ app, guild, author, interaction }) {
    const option = interaction.data.options.getUser('user', false) ?? author;
    const user = await app.rest.users.get(option.id);
    const member = guild ? await guild.getMember(option.id).catch(() => undefined) : undefined;
    const url = user.avatarURL();
    const url2 = member?.avatarURL();
    const items = [{
            media: {
                url,
            },
            description: "Avatar Global",
        }];
    const components = [{
            url,
            type: 2,
            style: 5,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];
    if (url2) {
        items.push({
            media: {
                url: url2,
            },
            description: "Avatar Local",
        });
        components.push({
            url: url2,
            type: 2,
            style: 5,
            label: "Avatar Local",
            emoji: await app.getButoji("download"),
        });
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `**${member?.nick ?? user.globalName ?? user.username}**`,
                    }, {
                        items,
                        type: 12,
                    }],
            }, {
                type: 1,
                components,
            }],
    });
})
    .setCommand({
    name: "avatar",
    description: "See a user avatar.",
    descriptionLocalizations: {
        "pt-BR": "Veja o avatar do usuário."
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
