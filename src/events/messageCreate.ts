import Event from "@/struct/event";

const InviteRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;

export default new Event(
    "on",
    "messageCreate",
    async function (app, message) {
        if (!message.guild || message.author.bot) return;
        if(message.guildID !== "1441209914830880843") return;

        const matches = [...message.content.matchAll(InviteRegex)];

        if (matches.length){
            const invites = await message.guild.getInvites();
            const localCodes = new Set(invites.map((i) => i.code.toLowerCase()));

            const externalInvite = matches.some(
                ([, code]) => !localCodes.has(code.toLowerCase())
            );

            if (externalInvite){
                await message.delete().catch(() => {});

                const warning = await message.channel?.createMessage({
                    content: `${message.author.mention} Não é permitido divulgar convites de servidores externos.`
                }).catch(() => null);

                if (warning) {
                    setTimeout(() => {
                        warning.delete().catch(() => {});
                    }, 15000);
                }
            }
        }

        if (isCapsLock(message.content)) {
            await message.delete();

            const warning = await message.channel?.createMessage({
                content: `${message.author.mention} Evite escrever em CAPS LOCK.`
            });

            setTimeout(() => warning?.delete().catch(() => {}), 5000);
        }
    }
);

function isCapsLock(text: string, threshold = 0.7) {
    const letters = text.match(/[a-zA-ZÀ-ÿ]/g);

    if (!letters || letters.length < 5) return false;

    const upper = letters.filter((c) => c === c.toUpperCase()).length;

    return upper / letters.length >= threshold;
}