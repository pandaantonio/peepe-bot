"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmojiOption;
const oceanic_js_1 = require("oceanic.js");
function EmojiOption(required) {
    return {
        required,
        name: "emoji",
        description: "Choose a emoji.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um emoji."
        },
        type: oceanic_js_1.ApplicationCommandOptionTypes.STRING,
    };
}
;
