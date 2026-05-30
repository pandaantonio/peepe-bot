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

interface Welcome {
    channelId: string;
    content: string;
    flags: number;
    embeds: any[];
    components: any[];
}

async function getWelcome(id: string): Promise<Welcome | undefined> {
    return await axios.get(`${process.env.WEBSITE}/api/guild/${id}/welcome`)
        .then((res) => res.data)
        .catch(() => undefined);
}

export default new Event("on", "guildMemberAdd", async (app, member) => {
    const guild = app.guilds.get(member.guildID);

    if(!guild) return;

    const data = await getData(member.guildID)
    const welcome = await getWelcome(member.guildID)

    if(data){
        if(data.users && data.users[0] && !member.bot){
            for(const roleID of data.users){
                await member.addRole(roleID)
                    .catch(console.log);
            }
        }

        if(data.apps && data.apps[0] && member.bot){
            for(const roleID of data.apps){
                await member.addRole(roleID)
                    .catch(console.log);
            }
        }
    }

    if(welcome){
        console.log(welcome);
        const channel = await app.getChannel(welcome.channelId);

        if(channel && channel.type === 0){
            channel.createMessage(welcome.flags === 0 ? ({
                content: welcome.content,
                embeds: welcome.embeds,
            }) : ({
                flags: welcome.flags,
                components: welcome.components,
            })).catch(console.log);
        } else {
            console.log(channel);
        }
    }
});