import Event from "@/struct/event";
import axios from "axios";

interface Role {
    id: string;
    name: string;
};

interface Autorole {
    users: Role[];
    apps: Role[];
};

async function getAutorole(id: string): Promise<Autorole | undefined> {
    return await axios.get(`https://peepe.vercel.app/api/guild/${id}/autorole`)
        .then((res) => res.data)
        .catch(() => undefined);
}

interface Welcome {
    enabled: boolean;
    webhookURL: string;
    isV2: boolean;
    message: {
        flags: number;
        content?: string;
        components?: any[];
        embeds?: any[];
    };
};

async function getWelcome(id: string): Promise<Welcome | undefined> {
    return await axios.get(`https://peepe.vercel.app/api/guild/${id}/welcome`)
        .then((res) => res.data)
        .catch(() => undefined);
}

export default new Event("on", "guildMemberAdd", async function (app, member) {
    const guild = app.guilds.get(`${member.guildID}`);

    //Welcome system 
    const welcome = await getWelcome(member.guildID);

    console.log(welcome);

    if(welcome && welcome.enabled){
        const [webhookId, webhookToken] = welcome.webhookURL.replace("https://discord.com/api/webhooks/", "").split("/");
        const webhook = await app.rest.webhooks.get(`${webhookId}`, `${webhookToken}`);

        if(webhook){
            await webhook.execute({
                ...welcome.message,
                username: `${guild?.name}`,
                avatarURL: guild?.iconURL() ?? undefined,
            }).catch(console.log);
        }
    }

    //Autorole system
    const autorole = await getAutorole(member.guildID);

    if (autorole) {
        if (autorole.users && autorole.users[0] && !member.bot) {
            for (const role of autorole.users) {
                await member.addRole(role.id).catch(console.log);
            }
        }

        if (autorole.apps && autorole.apps[0] && member.bot) {
            for (const role of autorole.apps) {
                await member.addRole(role.id).catch(console.log);
            }
        }
    }
});