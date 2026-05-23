import Modal from "../../app/modal";
import { adminDb } from "../../database/firebaseAdmin";

export default new Modal()
    .addName("say")

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

        await interaction.deferUpdate().catch(() => { });

        const content = interaction.data.components.getTextInput("content", true);

        await messagesRef.update({ content });

        interaction.editOriginal({ content });
    });
