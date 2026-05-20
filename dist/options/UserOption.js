"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserOption;
const oceanic_js_1 = require("oceanic.js");
function UserOption(required) {
    return {
        required,
        name: "user",
        nameLocalizations: {
            "pt-BR": "usuário"
        },
        description: "Choose a user.",
        descriptionLocalizations: {
            "pt-BR": "Escolha um usuário."
        },
        type: oceanic_js_1.ApplicationCommandOptionTypes.USER,
    };
}
;
