"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFlood = checkFlood;
const oceanic_js_1 = require("oceanic.js");
const FloodCache = new oceanic_js_1.Collection();
const FLOOD_MESSAGES = 5;
const FLOOD_INTERVAL = 5000; // 5 segundos
async function checkFlood(message) {
    if (!message.guildID)
        return false;
    const key = `${message.guildID}:${message.author.id}`;
    const messages = FloodCache.get(key) ?? [];
    const now = Date.now();
    messages.push({
        id: message.id,
        timestamp: now,
    });
    const filtered = messages.filter((msg) => now - msg.timestamp <=
        FLOOD_INTERVAL);
    FloodCache.set(key, filtered);
    if (filtered.length <
        FLOOD_MESSAGES) {
        return false;
    }
    try {
        const ids = filtered.map((msg) => msg.id);
        await message.channel.deleteMessages(ids);
    }
    catch {
        for (const msg of filtered) {
            try {
                const fetched = await message.channel.getMessage(msg.id);
                await fetched.delete();
            }
            catch { }
        }
    }
    FloodCache.delete(key);
    await message.member
        ?.edit({
        communicationDisabledUntil: new Date(Date.now() +
            5 * 60 * 1000).toISOString(),
    })
        .catch(() => { });
    return true;
}
