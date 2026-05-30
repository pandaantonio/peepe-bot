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
async function getWelcome(id) {
    return await axios_1.default.get(`${process.env.WEBSITE}/api/guild/${id}/welcome`)
        .then((res) => res.data)
        .catch(() => undefined);
}
exports.default = new event_1.default("on", "guildMemberAdd", async (app, member) => {
    const guild = app.guilds.get(member.guildID);
    if (!guild)
        return;
    const data = await getData(member.guildID);
    const welcome = await getWelcome(member.guildID);
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
    if (welcome) {
        const channel = await app.getChannel(welcome.channelID);
        if (channel && channel.type === 0) {
            channel.createMessage(welcome.flags === 0 ? ({
                content: welcome.content,
                embeds: replaces(true, JSON.stringify(welcome.embeds), member),
            }) : ({
                flags: welcome.flags,
                components: replaces(true, JSON.stringify(welcome.components), member),
            })).catch(console.log);
        }
        else {
            console.log(channel);
        }
    }
});
function replaces(parse, text, member) {
    let r = text.replaceAll("{user}", `${member.mention}`)
        .replaceAll("{user.id}", `${member.id}`)
        .replaceAll("{user.avatar}", `${member.avatarURL}`);
    return parse ? JSON.parse(r) : r;
}
