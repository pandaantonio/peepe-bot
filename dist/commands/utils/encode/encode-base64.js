"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("encode base64")
    .setRun(async function ({ interaction }) {
    const text = interaction.data.options.getString("text", true);
    interaction.createFollowup({
        content: `\`\`\`${Buffer.from(text).toString('base64')}\`\`\``
    });
});
