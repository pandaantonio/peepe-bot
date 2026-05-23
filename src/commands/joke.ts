import { MessageFlags } from "oceanic.js";
import Command from "@/struct/command";

export default new Command()
    .setRun(async function ({ app, interaction }) {
        try {
            const completion = await app.ai.chat.completions.create({
                model: "openai/gpt-oss-20b",

                messages: [
                    {
                        role: "system",
                        content: `
Você é um contador de piadas engraçadas.

Regras:
- Responda sempre em português do Brasil
- Faça piadas curtas
- Não explique a piada
- Não use humor ofensivo
                        `
                    },
                    {
                        role: "user",
                        content: "Conte uma piada"
                    }
                ],

                temperature: 1,
                max_tokens: 200
            });

            const response =
                completion.choices?.[0]?.message?.content ??
                "Não consegui pensar em uma piada agora 😭";

            await interaction.createFollowup({
                content: response.slice(0, 2000)
            });

        } catch (error) {
            console.error(error);

            await interaction.createFollowup({
                content: "Ocorreu um erro ao gerar a piada 😔",
                flags: MessageFlags.EPHEMERAL
            });
        }
    })

    .setCommand({
        type: 1,

        name: "joke",

        nameLocalizations: {
            "pt-BR": "piada"
        },

        description: "Generate a random joke.",

        descriptionLocalizations: {
            "pt-BR": "Gera uma piada aleatória."
        },
    });