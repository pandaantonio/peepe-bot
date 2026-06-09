"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const axios_1 = __importDefault(require("axios"));
const InviteRegex = /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;
const LinkRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
const MediaDomains = [
    "cdn.discordapp.com",
    "media.discordapp.net",
    "media.tenor.com",
    "tenor.com",
    "giphy.com",
];
const SocialDomains = [
    "youtube.com",
    "youtu.be",
    "instagram.com",
    "tiktok.com",
    "twitter.com",
    "x.com",
    "facebook.com",
];
async function getAntiinvite(id) {
    return await axios_1.default
        .get(`https://peepe.vercel.app/api/guild/${id}/antiinvite`)
        .then((res) => res.data)
        .catch(() => undefined);
}
async function getAntilink(id) {
    return await axios_1.default
        .get(`https://peepe.vercel.app/api/guild/${id}/antilink`)
        .then((res) => res.data)
        .catch(() => undefined);
}
exports.default = new event_1.default("on", "messageCreate", async function (app, message) {
    if (message.author.bot)
        return;
    if (!message.guild)
        return;
    if (!message.channel)
        return;
    const antiInvite = await getAntiinvite(`${message.guildID}`);
    if (antiInvite?.enabled) {
        const matches = [
            ...message.content.matchAll(InviteRegex),
        ];
        if (matches.length) {
            const invites = await message.guild
                .getInvites()
                .catch(() => []);
            const localCodes = new Set(invites.map((invite) => invite.code.toLowerCase()));
            const allowedInvites = new Set(antiInvite.allowedInvites.map((invite) => invite.toLowerCase()));
            const hasExternalInvite = matches.some(([_, code]) => {
                const inviteCode = code.toLowerCase();
                if (allowedInvites.has(inviteCode)) {
                    return false;
                }
                if (antiInvite.allowOwnInvites &&
                    localCodes.has(inviteCode)) {
                    return false;
                }
                return true;
            });
            if (hasExternalInvite) {
                await message
                    .delete()
                    .catch(() => { });
                await message.member
                    ?.edit({
                    communicationDisabledUntil: new Date(Date.now() +
                        5 *
                            60 *
                            1000).toISOString(),
                })
                    .catch(() => { });
                return;
            }
        }
    }
    const antiLink = await getAntilink(`${message.guildID}`);
    if (!antiLink?.enabled)
        return;
    if (!message.content.trim())
        return;
    const links = message.content.match(LinkRegex);
    if (!links?.length)
        return;
    const allowedDomains = new Set();
    antiLink.allowedDomains.forEach((domain) => allowedDomains.add(domain.toLowerCase()));
    if (antiLink.allowMedia) {
        MediaDomains.forEach((domain) => allowedDomains.add(domain));
    }
    if (antiLink.allowSocials) {
        SocialDomains.forEach((domain) => allowedDomains.add(domain));
    }
    const hasBlockedLink = links.some((link) => {
        try {
            const url = new URL(link.startsWith("http")
                ? link
                : `https://${link}`);
            const hostname = url.hostname.toLowerCase();
            return ![
                ...allowedDomains,
            ].some((domain) => hostname ===
                domain ||
                hostname.endsWith(`.${domain}`));
        }
        catch {
            return true;
        }
    });
    if (hasBlockedLink) {
        await message
            .delete()
            .catch(() => { });
        await message.member
            ?.edit({
            communicationDisabledUntil: new Date(Date.now() +
                5 * 60 * 1000).toISOString(),
        })
            .catch(() => { });
    }
});
