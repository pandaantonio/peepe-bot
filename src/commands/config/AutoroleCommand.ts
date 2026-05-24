import app from "@/database/firebase";
import { adminDb } from "@/database/firebaseAdmin";
import Command from "@/struct/command";
import { ComponentTypes, MessageFlags, SelectMenuDefaultValue } from "oceanic.js";

export default new Command()
    .addName("config autorole")

    .setRun(async function({ app, guild, interaction }){
        if(!guild) return;

        const snapshot = await adminDb.ref(`autorole/${guild.id}`).once('value');
        const data: { guildID: string, users: string[], apps: string[] } | undefined = snapshot.val();

        const defaultValues: SelectMenuDefaultValue[] = [];
        const defaultValues2: SelectMenuDefaultValue[] = [];

        if(data){
            if(data.users && data.users[0]){
                for(const roleID of data.users){
                    defaultValues.push({
                        id: roleID,
                        type: "role",
                    });
                }
            }

            if(data.apps && data.apps[0]){
                for(const roleID of data.apps){
                    defaultValues2.push({
                        id: roleID,
                        type: "role",
                    });
                }
            }
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("config")} **Atribuíção de Cargos Automático**:\n\n- Cargos para novos usuários:`
                }, {
                    type: 1,
                    components: [{
                        defaultValues,
                        minValues: 1,
                        maxValues: 5,
                        customID: "roles-users",
                        type: ComponentTypes.ROLE_SELECT,
                    }],
                }, {
                    type: 10,
                    content: `- Cargos para novos aplicativos:`
                }, {
                    type: 1,
                    components: [{
                        customID: "roles-apps",
                        minValues: 1,
                        maxValues: 5,
                        defaultValues: defaultValues2,
                        type: ComponentTypes.ROLE_SELECT,
                    }],
                }],
            }],
        });
    });