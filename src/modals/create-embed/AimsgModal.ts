import Modal from "../../app/modal";
import { adminDb } from "../../database/firebaseAdmin";

export default new Modal()
    .addName("ai_message")

    .setRun(async function ({ app, author, interaction }) {
        const messageId = interaction.message?.id;

        if (!messageId) return;

        const messagesRef = adminDb.ref(`messages/${author.id}/${messageId}`);

        const snapshot = await messagesRef.once("value");
        const data = snapshot.val();

        if (!data) return;

        if (interaction.message?.interactionMetadata?.user.id !== author.id) {
            await interaction.defer(64);

            await interaction.createFollowup({
                content: `Essa mensagem não é sua!`
            });

            return;
        }

        await interaction.deferUpdate().catch(() => {});

        const prompt = interaction.data.components.getTextInput("prompt", true);

        const chatCompletion = await app.ai.chat.completions.create({
            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "system",
                    content: `
Você é um gerador de mensagens para Discord.

Responda apenas JSON válido.

Formato:
{
  "content": "texto ou null",
  "embed": {
    "title": "titulo ou null",
    "description": "descrição ou null",
    "color": número decimal
  }
}

Regras:
- Gere content apenas se fizer sentido.
- Sempre gere um embed.
- Não explique nada.
- Responda apenas JSON.
                    `
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const response =
            chatCompletion.choices?.[0]?.message?.content || "{}";

        let parsed;

        try {
            parsed = JSON.parse(response);
        } catch {
            await interaction.createFollowup({
                content: "A IA retornou um JSON inválido."
            });

            return;
        }

        const newData = {
            ...data,

            content: parsed.content || null,

            embeds: [{
                title: parsed.embed?.title || null,
                description: parsed.embed?.description || null,
                color: parsed.embed?.color || 0x2b2d31
            }]
        };

        await messagesRef.set(newData);

        await interaction.editOriginal({
            content: parsed.content || null,

            embeds: [{
                title: parsed.embed?.title || null,
                description: parsed.embed?.description || null,
                color: parsed.embed?.color || 0x2b2d31
            }]
        });
    });