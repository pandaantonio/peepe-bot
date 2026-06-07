"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const firebaseAdmin_1 = require("@/lib/firebaseAdmin");
const InviteRegex = /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;
exports.default = new event_1.default("on", "messageCreate", async function (app, message) {
    if (message.author.bot)
        return;
    if (!message.channel)
        return;
    if (!message.guild)
        return;
    const antinviteRef = firebaseAdmin_1.adminDb.ref(`guilds/${message.guild.id}/anti-invite`);
    const snapshot = await antinviteRef.once("value");
    const data = snapshot.val();
    if (!data.enable)
        return;
    const matches = [...message.content.matchAll(InviteRegex)];
    if (!matches.length)
        return;
    const invites = await message.guild.getInvites();
    const localCodes = new Set(invites.map((i) => i.code.toLowerCase()));
    const externalInvite = matches.some(([, code]) => !localCodes.has(code.toLowerCase()));
    if (!externalInvite)
        return;
    await message.delete().catch(() => { });
    const warning = await message.channel.createMessage({
        content: `${message.author.mention} Não é permitido divulgar convites de servidores externos.`
    }).catch(() => null);
    if (warning) {
        setTimeout(() => {
            warning.delete().catch(() => { });
        }, 15000);
    }
});
