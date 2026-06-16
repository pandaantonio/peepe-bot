"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("encode base64")
    .setRun(async function ({ interaction }) {
    const text = interaction.data.options.getString("text", true);
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 10,
                content: `\`\`\`${Buffer.from(text).toString('base64')}\`\`\``,
            }]
    });
});
