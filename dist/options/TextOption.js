"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextOption;
const oceanic_js_1 = require("oceanic.js");
function TextOption(required) {
    return {
        required,
        name: "text",
        nameLocalizations: {
            "pt-BR": "texto"
        },
        description: "Enter the required text.",
        descriptionLocalizations: {
            "pt-BR": "Digite o texto necessário."
        },
        type: oceanic_js_1.ApplicationCommandOptionTypes.STRING,
    };
}
;
