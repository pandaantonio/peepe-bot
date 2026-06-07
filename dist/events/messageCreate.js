"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const InviteRegex = /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;
exports.default = new event_1.default("on", "messageCreate", async function (app, message) {
    if (message.author.bot)
        return;
    if (!message.channel)
        return;
    if (!message.guild)
        return;
    const { adminDb } = (await Promise.resolve().then(() => __importStar(require("@/lib/firebaseAdmin"))));
    const antinviteRef = adminDb.ref(`guilds/${message.guild.id}/anti-invite`);
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
