"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("config autorole")
    .setRun(async function ({ app, guild, interaction }) {
    if (!guild)
        return;
    const snapshot = await firebaseAdmin_1.adminDb.ref(`autorole/${guild.id}`).once('value');
    const data = snapshot.val();
    const defaultValues = [];
    const defaultValues2 = [];
    if (data) {
        if (data.users && data.users[0]) {
            for (const roleID of data.users) {
                defaultValues.push({
                    id: roleID,
                    type: "role",
                });
            }
        }
        if (data.apps && data.apps[0]) {
            for (const roleID of data.apps) {
                defaultValues2.push({
                    id: roleID,
                    type: "role",
                });
            }
        }
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
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
                                type: oceanic_js_1.ComponentTypes.ROLE_SELECT,
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
                                type: oceanic_js_1.ComponentTypes.ROLE_SELECT,
                            }],
                    }],
            }],
    });
});
