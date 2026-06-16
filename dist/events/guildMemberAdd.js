"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const axios_1 = __importDefault(require("axios"));
;
;
async function getAutorole(id) {
    return await axios_1.default.get(`https://peepe.vercel.app/api/guild/${id}/autorole`)
        .then((res) => res.data)
        .catch(() => undefined);
}
;
async function getWelcome(id) {
    return await axios_1.default.get(`https://peepe.vercel.app/api/guild/${id}/welcome`)
        .then((res) => res.data)
        .catch(() => undefined);
}
exports.default = new event_1.default("on", "guildMemberAdd", async function (app, member) {
    const guild = app.guilds.get(`${member.guildID}`);
    //Welcome system 
    const welcome = await getWelcome(member.guildID);
    if (welcome && welcome.enabled) {
        const channel = await app.getChannel(welcome.channelId);
        if (channel && channel.type === 0) {
            await channel.createMessage(welcome.message).catch(console.log);
        }
    }
    //Autorole system
    const autorole = await getAutorole(member.guildID);
    if (autorole) {
        if (autorole.users && autorole.users[0] && !member.bot) {
            for (const role of autorole.users) {
                await member.addRole(role.id).catch(console.log);
            }
        }
        if (autorole.apps && autorole.apps[0] && member.bot) {
            for (const role of autorole.apps) {
                await member.addRole(role.id).catch(console.log);
            }
        }
    }
});
