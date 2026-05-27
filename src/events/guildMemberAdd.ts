import { adminDb } from "@/database/firebaseAdmin";
import Event from "@/struct/event";
import axios from "axios";

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

export default new Event("on", "guildMemberAdd", async (app, member) => {
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
});