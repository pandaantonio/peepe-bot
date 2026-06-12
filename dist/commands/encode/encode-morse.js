"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const morse_1 = require("@/utils/morse");
exports.default = new command_1.default()
    .addName("encode morse")
    .setRun(async function ({ interaction }) {
    const text = interaction.data.options.getString("text", true);
    interaction.createFollowup({
        //@ts-ignore
        content: `\`\`\`${text.toLowerCase().split('').map(c => morse_1.MORSE_CODE[c] ?? c).join(' ')}\`\`\``
    });
});
