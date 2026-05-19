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
Você é uma Magic 8 Ball.
Responda APENAS com uma resposta curta e misteriosa igual uma bola 8 mágica.
Nunca explique a resposta.
Nunca use emojis.
Use no máximo 1 frase.

Exemplos:
- Sim.
- Não conte com isso.
- Os sinais apontam que sim.
- Talvez no futuro.
- Melhor não te dizer agora.
- Muito provável.
- Minhas fontes dizem que não.
`
                },
                {
                    role: "user",
                    content: question
                }
            ]
        });

        const res =
            chatCompletion.choices?.[0]?.message?.content || "The spirits are silent.";

        await interaction.reply({
            content: res,
        });
    })

    .setCommand({
        type: 1,
        name: "8ball",
        description: "Ask the magic 8-ball a question and receive a mysterious answer.",
        descriptionLocalizations: {
            "pt-BR": "Faça uma pergunta para a bola mágica e receba uma resposta misteriosa."
        },
        options: [{
            type: 3,
            required: true,
            name: "question",
            nameLocalizations: {
                "pt-BR": "pergunta"
            },
            description: "The question you want to ask the magic 8-ball.",
            descriptionLocalizations: {
                "pt-BR": "A pergunta que você quer fazer para a bola mágica."
            },
        }],
    });