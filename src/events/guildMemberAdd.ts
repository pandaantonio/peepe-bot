import { adminDb } from "@/database/firebaseAdmin";
import Event from "@/struct/event";
import axios from "axios";
import { ExecuteWebhookOptions, Guild } from "oceanic.js";

interface AutoroleData {
    guildId: string;
    users: string[];
    apps: string[];
};

async function getData(id: string): Promise<AutoroleData | undefined> {
    return await axios.get(`${process.env.WEBSITE}/api/guild/${id}/autorole`)
        .then((res) => res.data)
        .catch(() => undefined);
}

interface WelcomeDoc {
    messages: {
        webhook: {
            id: string;
            token: string;
        },
        flags: number;
        content: string;
        embeds: any[];
        components: any[];
    }[];
};

async function getDoc(id: string): Promise<WelcomeDoc | undefined>{
    return await axios.get(`${process.env.WEBSITE}/api/guild/${id}/welcome`)
        .then((res) => res.data)
        .catch(() => undefined);
}

export default new Event("on", "guildMemberAdd", async (app, member) => {
    const guild = app.guilds.get(member.guildID);
    const data = await getData(member.guildID)

    if(data){
        if(data.users && data.users[0] && !member.bot){
            for(const roleID of data.users){
                await member.addRole(roleID).catch(console.log);
            }
        }

        if(data.apps && data.apps[0] && member.bot){
            for(const roleID of data.apps){
                await member.addRole(roleID).catch(console.log);
            }
        }
    }

    const doc = await getDoc(member.guildID);

    if(doc && doc.messages && doc.messages[0]){
        for(const message of doc.messages){
            const webhook = await app.rest.webhooks.get(message.webhook.id, message.webhook.token)
                .catch(() => undefined);

            if(webhook){
                const obj: ExecuteWebhookOptions = {
                    flags: message.flags,
                    username: `${guild?.name}`,
                    avatarURL: guild?.iconURL() || undefined,
                };

                await webhook.execute(message.flags === 0 ? ({
                    ...obj,
                    embeds: message.embeds,
                    content: message.content,
                }) : ({
                    ...obj,
                    components: message.components,
                }));
            }
        }
    }
});