import Event from "@/struct/event";
import axios from "axios";

interface Autorole {
    users: string[];
    apps: string[];
};

async function getAutorole(id: string): Promise<Autorole | undefined> {
    return await axios.get(`https://peepe.vercel.app/api/guild/${id}/autorole`)
        .then((res) => res.data)
        .catch(() => undefined);
}

export default new Event("on", "guildMemberAdd", async function (app, member) {
    //Autorole system
    const autorole = await getAutorole(member.guildID);

    if (autorole?.users.length && !member.bot) {
        for (const id of autorole.users) {
            await member.addRole(id).catch(() => { });
        }
    }

    if (autorole?.apps.length && member.bot) {
        for (const id of autorole.apps) {
            await member.addRole(id).catch(() => { });
        }
    }
});