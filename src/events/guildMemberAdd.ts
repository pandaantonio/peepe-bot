import { adminDb } from "@/database/firebaseAdmin";
import Event from "@/struct/event";

export default new Event("on", "guildMemberAdd", async (app, member) => {
    const snapshot = await adminDb.ref(`autorole/${member.guildID}`).once('value');
    const data: { guildID: string, users: string[], apps: string[] } | undefined = snapshot.val();

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