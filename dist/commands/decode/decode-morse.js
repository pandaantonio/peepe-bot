"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const morse_1 = require("@/utils/morse");
exports.default = new command_1.default()
    .addName("decode morse")
    .setRun(async function ({ interaction }) {
    const text = interaction.data.options.getString("text", true);
    interaction.createFollowup({
        content: `\`\`\`${text.split(' ').map(code => morse_1.REVERSE_MORSE[code] || code).join('')}\`\`\``
    });
});
