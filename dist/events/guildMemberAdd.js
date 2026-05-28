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
;
async function getDoc(id) {
    return await axios_1.default.get(`${process.env.WEBSITE}/api/guild/${id}/welcome`)
        .then((res) => res.data)
        .catch(() => undefined);
}
exports.default = new event_1.default("on", "guildMemberAdd", async (app, member) => {
    const guild = app.guilds.get(member.guildID);
    const data = await getData(member.guildID);
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
    const doc = await getDoc(member.guildID);
    if (doc && doc.messages && doc.messages[0]) {
        for (const message of doc.messages) {
            const webhook = await app.rest.webhooks.get(message.webhook.id, message.webhook.token)
                .catch(() => undefined);
            if (webhook) {
                const obj = {
                    flags: message.flags,
                    username: `${guild?.name}`,
                    avatarURL: guild?.iconURL() || undefined,
                };
                await webhook.execute(message.flags === 0 ? ({
                    ...obj,
                    embeds: message.embeds,
                    content: message.content,
                }) : ({
                    ...obj,
                    components: message.components,
                }));
            }
        }
    }
});
