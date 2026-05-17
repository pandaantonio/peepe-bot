import Modal from "../../app/modal";
import EmbedContext from "../../context/create-embed/EmbedContext";
import { adminDb } from "../../database/firebaseAdmin";

const URL_REGEX = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

export default new Modal()
    .addName("edit.embed.url")

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

        const url = interaction.data.components.getTextInput("url", false);
        const image = interaction.data.components.getTextInput("image", false);
        const thumbnail = interaction.data.components.getTextInput("thumbnail", false);

        const embeds = data.embeds || [];
        const selectedIndex = data.selectedEmbedIndex ?? 0;

        if (!embeds[selectedIndex]) {
            embeds[selectedIndex] = {};
        }

        const embed = embeds[selectedIndex];

        // URL do embed
        if (url?.trim()) {
            if (!URL_REGEX.test(url)) {
                await interaction.defer(64);
                await interaction.createFollowup({
                    content: "URL inválida!",
                });
                return;
            }
            embed.url = url;
        }

        // Imagem
        if (image?.trim()) {
            if (!URL_REGEX.test(image)) {
                await interaction.defer(64);
                await interaction.createFollowup({
                    content: "URL da imagem inválida!",
                });
                return;
            }
            embed.image = { url: image };
        }

        // Thumbnail
        if (thumbnail?.trim()) {
            if (!URL_REGEX.test(thumbnail)) {
                await interaction.defer(64);
                await interaction.createFollowup({
                    content: "URL da thumbnail inválida!",
                });
                return;
            }
            embed.thumbnail = { url: thumbnail };
        }

        await interaction.deferUpdate().catch(() => { });

        await messagesRef.update({ embeds });

        interaction.editOriginal({
            components: await EmbedContext(app)
        });
    });
