import Modal from "../../app/modal";
import EmbedContext from "../../context/create-embed/EmbedContext";
import { adminDb } from "../../database/firebaseAdmin";

export default new Modal()
    .addName("add.embed")

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

        const title = interaction.data.components.getTextInput("title", true);
        const description = interaction.data.components.getTextInput("description", true);

        const embeds = data.embeds || [];

        if (embeds.length >= 9) {
            await interaction.defer(64);
            await interaction.createFollowup({
                content: `Limite de 10 incorporações.`
            });
            return;
        }

        await interaction.deferUpdate().catch(() => { });

        embeds.push({ title, description });

        await messagesRef.update({
            embeds: embeds,
            selectedEmbedIndex: embeds.length - 1
        });

        interaction.editOriginal({
            components: await EmbedContext(app),
        });
    });
