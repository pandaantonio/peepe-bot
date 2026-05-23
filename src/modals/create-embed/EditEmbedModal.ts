import Modal from "@/struct/modal";
import EmbedContext from "../../context/create-embed/EmbedContext";
import { adminDb } from "../../database/firebaseAdmin";
import hexToDecimal, { HEX_REGEX } from "../../utils/HexToDecimal";

export default new Modal()
    .addName("edit.embed")

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

        const title = interaction.data.components.getTextInput("title", false);
        const description = interaction.data.components.getTextInput("description", false);
        const color = interaction.data.components.getTextInput("color", false);

        const embeds = data.embeds || [];
        const selectedIndex = data.selectedEmbedIndex ?? 0;

        if (!embeds[selectedIndex]) {
            embeds[selectedIndex] = {};
        }

        const embed = embeds[selectedIndex];

        if (title?.trim()) {
            embed.title = title;
        }

        if (description?.trim()) {
            embed.description = description;
        }

        if (color?.trim()) {
            if (!HEX_REGEX.test(color)) {
                await interaction.defer(64);
                await interaction.createFollowup({
                    content: "Cor hexadecimal inválida!",
                    flags: 64,
                });
                return;
            }
            embed.color = hexToDecimal(color);
        }

        await interaction.deferUpdate().catch(() => { });

        await messagesRef.update({ embeds });

        interaction.editOriginal({
            embeds: embeds ?? [],
            components: await EmbedContext(app)
        });
    });
