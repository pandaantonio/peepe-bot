"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .setRun(async function ({ app, interaction }) {
    const question = interaction.data.options.getString("question", true);
    const chatCompletion = await app.ai.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content: `
Você é um assistente útil, inteligente e amigável.
Responda de forma natural e clara.
`
            },
            {
                role: "user",
                content: question
            }
        ]
    });
    const res = chatCompletion.choices?.[0]?.message?.content || "I couldn't generate a response.";
    await interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 10,
                content: `${res.slice(0, 2000)}`,
            }],
    });
})
    .setCommand({
    type: 1,
    name: "chat",
    description: "Chat with the AI assistant.",
    descriptionLocalizations: {
        "pt-BR": "Converse com a inteligência artificial."
    },
    options: [{
            type: 3,
            required: true,
            name: "question",
            nameLocalizations: {
                "pt-BR": "pergunta"
            },
            description: "What do you want to ask the AI?",
            descriptionLocalizations: {
                "pt-BR": "O que você deseja perguntar para a IA?"
            },
        }],
});
