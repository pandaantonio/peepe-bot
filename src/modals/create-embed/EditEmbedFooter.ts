import Modal from "../../app/modal";
import EmbedContext from "../../context/create-embed/EmbedContext";
import { adminDb } from "../../database/firebaseAdmin";

export default new Modal()
    .addName("edit.embed.footer")

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
                content: "Essa mensagem não é sua!"
            });

            return;
        }

        const text = interaction.data.components.getTextInput("text", false);
        const icon_url = interaction.data.components.getTextInput("icon_url", false);

        const embeds = data.embeds || [];
        const selectedIndex = data.selectedEmbedIndex ?? 0;

        if (!embeds[selectedIndex]) {
            embeds[selectedIndex] = {};
        }

        const embed = embeds[selectedIndex];

        if (!embed.footer) {
            embed.footer = {};
        }

        if (text) {
            embed.footer.text = text;
        }

        if (icon_url) {
            embed.footer.icon_url = icon_url;
        }

        await interaction.deferUpdate().catch(() => { });

        await messagesRef.update({ embeds });

        await interaction.editOriginal({
            components: await EmbedContext(app)
        });
    });