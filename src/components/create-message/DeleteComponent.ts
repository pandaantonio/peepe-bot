import Component from "@/struct/component";
import { adminDb } from "@/database/firebaseAdmin";

export default new Component()
    .addName("delete_message")

    .setRun(async function ({ author, interaction }) {
        if (interaction.data.componentType !== 2) return;

        if (interaction.message.interactionMetadata?.user.id !== author.id) {
            await interaction.defer(64);

            await interaction.createFollowup({
                content: "Essa mensagem não é sua!"
            });

            return;
        }

        const messageId = interaction.message.id;

        const messageRef = adminDb.ref(
            `messages/${author.id}/${messageId}`
        );

        const snapshot = await messageRef.once("value");

        if (!snapshot.exists()) return;

        await interaction.deferUpdate().catch(() => {});

        await messageRef.remove();

        await interaction.editOriginal({
            content: "Mensagem apagada com sucesso!",
            embeds: [],
            components: []
        });
    });