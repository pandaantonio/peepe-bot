"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const event_1 = __importDefault(require("@/struct/event"));
exports.default = new event_1.default("on", "guildMemberAdd", async (app, member) => {
    const snapshot = await firebaseAdmin_1.adminDb.ref(`autorole/${member.guildID}`).once('value');
    const data = snapshot.val();
    if (data) {
        if (data.users && data.users[0] && !member.bot) {
            for (const roleID of data.users) {
                await member.addRole(roleID).catch(console.log);
            }
        }
        if (data.apps && data.apps[0] && member.bot) {
            for (const roleID of data.apps) {
                await member.addRole(roleID).catch(console.log);
            }
        }
    }
});
