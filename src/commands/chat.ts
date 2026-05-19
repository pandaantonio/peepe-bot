import { MessageFlags } from "oceanic.js";
import Command from "../app/command";

export default new Command()
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

        const res =
            chatCompletion.choices?.[0]?.message?.content || "I couldn't generate a response.";

        await interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
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