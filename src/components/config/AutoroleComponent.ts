import { adminDb } from "@/database/firebaseAdmin";
import Component from "@/struct/component";
import { ComponentTypes, MessageFlags, SelectMenuDefaultValue } from "oceanic.js";

export default new Component()
    .addName("roles-users", "roles-apps")

    .setRun(async ({ app, guild, author, interaction }) => {
        if(!guild) return;
        if(interaction.data.componentType !== ComponentTypes.ROLE_SELECT) return;

        if (author.id !== interaction.message.interactionMetadata?.user.id) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`,
                }],
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        const roles = interaction.data.values.getRoles(true);
        const customID = interaction.data.customID;

        const snapshot = await adminDb.ref(`autorole/${guild.id}`).once('value');
        const data: { guildID: string, users: string[], apps: string[] } | undefined = snapshot.val();

        const rolesUsers = [];
        const rolesApps = [];

        if(customID === "roles-users"){
            for(const role of roles){
                rolesUsers.push(role.id);
            }

            if(data && data.apps && data.apps[0]){
                for(const roleID of data.apps){
                    rolesApps.push(roleID);
                }
            }
        } else {
            for(const role of roles){
                rolesApps.push(role.id);
            }

            if(data && data.users && data.users[0]){
                for(const roleID of data.users){
                    rolesUsers.push(roleID);
                }
            }
        }

        await adminDb.ref(`autorole/${guild.id}`).update({
            users: rolesUsers,
            apps: rolesApps,
        });

        interaction.editOriginal({
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("config")} **Atribuíção de Cargos Automático**:\n\n- Cargos para novos usuários:`
                }, {
                    type: 1,
                    components: [{
                        minValues: 1,
                        maxValues: 5,
                        customID: "roles-users",
                        type: ComponentTypes.ROLE_SELECT,
                        defaultValues: rolesUsers.map((roleID) => ({ id: roleID, type: "role" })),
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
                        type: ComponentTypes.ROLE_SELECT,
                        defaultValues: rolesApps.map((roleID) => ({ id: roleID, type: "role" })),
                    }],
                }],
            }],
        });
    });