"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEmoji;
const oceanic_js_1 = require("oceanic.js");
;
function getEmoji(emoji) {
    if (!emoji || typeof emoji !== "string") {
        return undefined;
    }
    // Decodifica caso venha encoded
    if (emoji.includes("%")) {
        emoji = decodeURIComponent(emoji);
    }
    // Regex para emojis customizados do Discord
    const match = emoji.match(/<?(a)?:(\w{2,32}):(\d{17,19})>?/);
    if (!match) {
        return undefined;
    }
    const [, animatedFlag, name, id] = match;
    const animated = Boolean(animatedFlag);
    return {
        createdAt: oceanic_js_1.Base.getCreatedAt(id),
        animated,
        name,
        id,
        mention: `<${animated ? "a" : ""}:${name}:${id}>`,
        url: `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}?quality=lossless`,
    };
}
