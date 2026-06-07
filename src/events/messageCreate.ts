import Event from "@/struct/event";

const InviteRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;

const LinkRegex =
    /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;

const AllowedDomains = [
    // Discord
    "cdn.discordapp.com",
    "media.discordapp.net",

    // GIFs
    "tenor.com",
    "media.tenor.com",
    "giphy.com",
    "media.giphy.com",

    // YouTube
    "youtube.com",
    "www.youtube.com",
    "youtu.be",
    "m.youtube.com",

    // TikTok
    "tiktok.com",
    "www.tiktok.com",
    "vm.tiktok.com",
    "vt.tiktok.com",

    // Instagram
    "instagram.com",
    "www.instagram.com"
];

export default new Event("on", "messageCreate", async function (app, message) {
    if (message.author.bot) return;
    if (!message.channel) return;
    if (!message.guild) return;

    const { adminDb } = await import("@/lib/firebaseAdmin");

    /*
     * Anti Invite
     */
    const antiInviteRef = adminDb.ref(
        `guilds/${message.guild.id}/anti-invite`
    );

    const antiInviteSnapshot = await antiInviteRef.once("value");
    const antiInvite = antiInviteSnapshot.val();

    if (antiInvite?.enable) {
        const matches = [...message.content.matchAll(InviteRegex)];

        if (matches.length) {
            const invites = await message.guild.getInvites().catch(() => []);

            const localCodes = new Set(
                invites.map((invite) => invite.code.toLowerCase())
            );

            const externalInvite = matches.some(
                ([, code]) => !localCodes.has(code.toLowerCase())
            );

            if (externalInvite) {
                await message.delete().catch(() => {});

                await message.member?.edit({
                    communicationDisabledUntil: new Date(
                        Date.now() + 5 * 60 * 1000
                    ).toISOString(),
                }).catch(() => {});

                return;
            }
        }
    }

    /*
     * Anti Link
     */
    const antiLinkRef = adminDb.ref(
        `guilds/${message.guild.id}/anti-link`
    );

    const antiLinkSnapshot = await antiLinkRef.once("value");
    const antiLink = antiLinkSnapshot.val();

    if (antiLink?.enable) {
        // Ignora mensagens sem texto
        if (!message.content.trim()) return;

        const links = message.content.match(LinkRegex);

        if (!links?.length) return;

        const hasBlockedLink = links.some((link) => {
            try {
                const url = new URL(
                    link.startsWith("http")
                        ? link
                        : `https://${link}`
                );

                return !AllowedDomains.some((domain) =>
                    url.hostname.endsWith(domain)
                );
            } catch {
                return true;
            }
        });

        if (hasBlockedLink) {
            await message.delete().catch(() => {});

            await message.member?.edit({
                communicationDisabledUntil: new Date(
                    Date.now() + 5 * 60 * 1000
                ).toISOString(),
            }).catch(() => {});
        }
    }
});