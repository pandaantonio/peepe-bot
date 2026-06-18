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
    const user = await app.rest.users.get(member.id);
    const guild = app.guilds.get(`${member.guildID}`);
    //Welcome system 
    const welcome = await getWelcome(member.guildID);
    if (welcome && welcome.enabled) {
        const channel = await app.getChannel(welcome.channelId);
        const jsonString = JSON.stringify(welcome.message)
            .replaceAll("{user}", `${user.mention}`)
            .replaceAll("{user.name}", `${user.globalName ?? user.username}`)
            .replaceAll("{user.id}", `${user.id}`)
            .replaceAll("{user.username}", `${user.username}`)
            .replaceAll("{user.avatar}", `${user.avatarURL()}`)
            .replaceAll("{user.banner}", `${user.bannerURL()}`)
            .replaceAll("{server.name}", `${guild?.name}`)
            .replaceAll("{server.id}", `${guild?.id}`)
            .replaceAll("{server.icon}", `${guild?.iconURL()}`)
            .replaceAll("{server.banner}", `${guild?.bannerURL()}`)
            .replaceAll("{server.splash}", `${guild?.splashURL()}`)
            .replaceAll("{server.memberCount}", `${guild?.memberCount}`);
        let message = JSON.parse(jsonString);
        if (!message.components)
            message.components = [];
        message.components.push({
            type: 1,
            components: [{
                    type: 2,
                    style: 5,
                    disabled: true,
                    url: `https://discord.com/guilds/${guild?.id}`,
                    label: `${guild?.name}`,
                }],
        });
        if (channel && channel.type === 0) {
            await channel.createMessage(message)
                .catch(console.log);
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
