"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("../../app/command"));
const emoji_view_1 = __importDefault(require("./emoji-view"));
const emoji_info_1 = __importDefault(require("./emoji-info"));
exports.default = new command_1.default().setCommand({
    name: "emoji",
    description: "Null",
    options: [
        emoji_view_1.default.subcommand,
        emoji_info_1.default.subcommand,
    ],
    contexts: [
        oceanic_js_1.InteractionContextTypes.BOT_DM,
        oceanic_js_1.InteractionContextTypes.GUILD,
        oceanic_js_1.InteractionContextTypes.PRIVATE_CHANNEL,
    ],
    integrationTypes: [
        oceanic_js_1.ApplicationIntegrationTypes.GUILD_INSTALL,
        oceanic_js_1.ApplicationIntegrationTypes.USER_INSTALL,
    ],
    type: oceanic_js_1.ApplicationCommandTypes.CHAT_INPUT,
});
