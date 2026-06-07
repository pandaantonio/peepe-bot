import Event from "@/struct/event";
import { adminDb } from "@/lib/firebaseAdmin";

const InviteRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;

export default new Event("on", "messageCreate", async function(app, message){
    if(message.author.bot) return;
    if(!message.channel) return;
    if(!message.guild) return;

    const antinviteRef = adminDb.ref(`guilds/${message.guild.id}/anti-invite`);
    const snapshot = await antinviteRef.once("value");
    const data = snapshot.val();

    if(!data.enable) return;
    
    const matches = [...message.content.matchAll(InviteRegex)];

    if (!matches.length) return;

    const invites = await message.guild.getInvites();
    const localCodes = new Set(invites.map((i) => i.code.toLowerCase()));

    const externalInvite = matches.some(
        ([, code]) => !localCodes.has(code.toLowerCase())
    );

    if (!externalInvite) return;

    await message.delete().catch(() => {});

    const warning = await message.channel.createMessage({
        content: `${message.author.mention} Não é permitido divulgar convites de servidores externos.`
    }).catch(() => null);

    if (warning) {
        setTimeout(() => {
            warning.delete().catch(() => {});
        }, 15000);
    }
});