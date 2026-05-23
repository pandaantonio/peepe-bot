import Modal from "@/struct/modal";
import SayContext from "../../context/create-embed/SayContext";
import { adminDb } from "../../database/firebaseAdmin";

export default new Modal()
    .addName("config-message")

    .setRun(async function ({ app, author, interaction }) {
        if (interaction.message?.interactionMetadata?.user.id !== author.id) {
            await interaction.defer(64);
            await interaction.createFollowup({
                content: `Essa mensagem não é sua!`
            });
            return;
        }

        await interaction.deferUpdate().catch(() => { });

        const name = interaction.data.components.getTextInput("name", true);

        const messagesRef = adminDb.ref(`messages/${author.id}/${interaction.message.id}`);

        await messagesRef.update({
            name,
            id: `${interaction.message.id}`,
            authorID: author.id,
            channelID: `${interaction.channel?.id}`,
        });

        interaction.editOriginal({
            components: await SayContext(app),
        });
    });
