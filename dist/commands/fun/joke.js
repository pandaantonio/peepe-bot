"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("joke")
    .setRun(async function ({ app, interaction }) {
    try {
        const completion = await app.ai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            temperature: 1,
            max_tokens: 100,
            messages: [
                {
                    role: "system",
                    content: "Conte uma piada engraçada sobre qualquer assunto. Use emojis para decorar a mensagem. A resposta será enviada em um servidor do Discord."
                }
            ]
        });
        const content = completion.choices?.[0]?.message?.content ??
            "😂 Não consegui pensar em uma piada agora!";
        await interaction.createFollowup({
            content: String(content),
        });
    }
    catch (error) {
        console.error(error);
        await interaction.createFollowup({
            content: "❌ Ocorreu um erro ao gerar a piada.",
        });
    }
});
