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

export default new Event("on", "guildMemberAdd", async function (app, member) {
    //Autorole system
    const autorole = await getAutorole(member.guildID);

    if (autorole && autorole.users && autorole.users[0] && !member.bot) {
        for (const role of autorole.users) {
            await member.addRole(role.id).catch(console.log);
        }
    }

    if (autorole && autorole.apps && autorole.apps[0] && member.bot) {
        for (const role of autorole.apps) {
            await member.addRole(role.id).catch(console.log);
        }
    }
});