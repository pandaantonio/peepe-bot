"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const axios_1 = __importDefault(require("axios"));
;
async function getData(id) {
    return await axios_1.default.get(`${process.env.WEBSITE}/api/guild/${id}/autorole`)
        .then((res) => res.data)
        .catch(() => undefined);
}
exports.default = new event_1.default("on", "guildMemberAdd", async (app, member) => {
    const guild = app.guilds.get(member.guildID);
    const data = await getData(member.guildID);
    if (data) {
        if (data.users && data.users[0] && !member.bot) {
            for (const roleID of data.users) {
                await member.addRole(roleID)
                    .catch(console.log);
            }
        }
        if (data.apps && data.apps[0] && member.bot) {
            for (const roleID of data.apps) {
                await member.addRole(roleID)
                    .catch(console.log);
            }
        }
    }
});
