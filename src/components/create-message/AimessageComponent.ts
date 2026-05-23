import Component from "@/struct/component";
import { adminDb } from "@/database/firebaseAdmin";

export default new Component()
    .addName("ai_message")

    .setRun(async function ({ app, author, interaction }) {
        if (interaction.data.componentType !== 2) return;

        if (interaction.message.interactionMetadata?.user.id !== author.id) {
            await interaction.defer(64);

            interaction.createFollowup({
                content: `Essa mensagem não é sua!`
            });
            return;
        }

        const messageId = interaction.message.id;
        const messagesRef = adminDb.ref(`messages/${author.id}/${messageId}`);
        const snapshot = await messagesRef.once("value");
        const data = snapshot.val();

        if (!data) return;

        await interaction.createModal({
            title: "grahguieghaie",
            customID: "ai_message",
            components: [{
                type: 1,
                components: [{
                    type: 4,
                    style: 2,
                    required: true,
                    customID: "prompt",
                    label: "Prompt",
                }],
            }],
        });
    });