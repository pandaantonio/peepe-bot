import { adminDb } from "@/database/firebaseAdmin";
import Event from "@/struct/event";
import axios from "axios";
import { ExecuteWebhookOptions, Guild, Member } from "oceanic.js";

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
    channelID: string;
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
        const channel = await app.getChannel(welcome.channelID);

        if(channel && channel.type === 0){
            channel.createMessage(welcome.flags === 0 ? ({
                content: welcome.content,
                embeds: replaces(true, JSON.stringify(welcome.embeds), member),
            }) : ({
                flags: welcome.flags,
                components: replaces(true, JSON.stringify(welcome.components), member),
            })).catch(console.log);
        } else {
            console.log(channel);
        }
    }
});

function replaces(parse: boolean, text: string, member: Member){
    let r = text
        .replaceAll("{user}", `${member.mention}`)
        .replaceAll("{user.id}", `${member.id}`)
        .replaceAll("{user.avatar}", `${member.avatarURL()}`);

    return parse ? JSON.parse(r) : r;
}
