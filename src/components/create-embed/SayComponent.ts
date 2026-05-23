import Component from "@/struct/component";
import EmbedsContext from "@/context/create-embed/EmbedsContext";
import { adminDb } from "@/database/firebaseAdmin";

export default new Component()
    .addName("say")

    .setRun(async function ({ app, author, interaction }) {
        if (interaction.data.componentType !== 3) return;

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

        const values = interaction.data.values.getStrings();

        if (values[0] === "content") {
            await interaction.createModal({
                customID: "say",
                title: "Formulário de edição de mensagem",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 2,
                        required: true,
                        customID: "content",
                        label: "Conteúdo",
                        value: data.content,
                    }]
                }]
            });
        } else {
            await interaction.deferUpdate().catch((e) => { });

            interaction.editOriginal({
                components: await EmbedsContext(app, data.embeds),
            });
        }
    });