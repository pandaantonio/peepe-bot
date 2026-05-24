"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const component_1 = __importDefault(require("@/struct/component"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new component_1.default()
    .addName("roles-users", "roles-apps")
    .setRun(async ({ app, guild, author, interaction }) => {
    if (!guild)
        return;
    if (interaction.data.componentType !== oceanic_js_1.ComponentTypes.ROLE_SELECT)
        return;
    if (author.id !== interaction.message.interactionMetadata?.user.id) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
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
    const snapshot = await firebaseAdmin_1.adminDb.ref(`autorole/${guild.id}`).once('value');
    const data = snapshot.val();
    const rolesUsers = [];
    const rolesApps = [];
    if (customID === "roles-users") {
        for (const role of roles) {
            rolesUsers.push(role.id);
        }
        if (data && data.apps && data.apps[0]) {
            for (const roleID of data.apps) {
                rolesApps.push(roleID);
            }
        }
    }
    else {
        for (const role of roles) {
            rolesApps.push(role.id);
        }
        if (data && data.users && data.users[0]) {
            for (const roleID of data.users) {
                rolesUsers.push(roleID);
            }
        }
    }
    await firebaseAdmin_1.adminDb.ref(`autorole/${guild.id}`).update({
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
                                type: oceanic_js_1.ComponentTypes.ROLE_SELECT,
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
                                type: oceanic_js_1.ComponentTypes.ROLE_SELECT,
                                defaultValues: rolesApps.map((roleID) => ({ id: roleID, type: "role" })),
                            }],
                    }],
            }],
    });
});
