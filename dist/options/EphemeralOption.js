"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EphemeralOption;
const oceanic_js_1 = require("oceanic.js");
function EphemeralOption(required) {
    return {
        required,
        name: "ephemeral",
        nameLocalizations: {
            "pt-BR": "efemera"
        },
        description: "Yes?",
        descriptionLocalizations: {
            "pt-BR": "Sim?"
        },
        type: oceanic_js_1.ApplicationCommandOptionTypes.BOOLEAN,
    };
}
;
