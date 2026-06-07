"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const axios_1 = __importDefault(require("axios"));
;
async function getAutorole(id) {
    return await axios_1.default.get(`https://peepe.vercel.app/api/guild/${id}/autorole`)
        .then((res) => res.data)
        .catch(() => undefined);
}
exports.default = new event_1.default("on", "guildMemberAdd", async function (app, member) {
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
