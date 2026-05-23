import Component from "@/struct/component";
import SayContext from "@/context/create-embed/SayContext";
import { adminDb } from "@/database/firebaseAdmin";

export default new Component()
    .addName("config-embed")

    .setRun(async function ({ app, author, interaction }) {
        if (interaction.data.componentType !== 3) return;

        if (interaction.message.interactionMetadata?.user.id !== author.id) {
            await interaction.defer(64);

            await interaction.createFollowup({
                content: "Essa mensagem não é sua!"
            });

            return;
        }

        const values = interaction.data.values.getStrings();
        const value = values[0];

        if (value === "add.message") {
            await interaction.createModal({
                title: "Criação de mensagem",
                customID: "config-message",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 1,
                        customID: "name",
                        label: "Nome",
                    }],
                }],
            });

            return;
        }

        await interaction.deferUpdate().catch(() => {});

        const oldRef = adminDb.ref(
            `messages/${author.id}/${value}`
        );

        const snapshot = await oldRef.once("value");
        const data = snapshot.val();

        if (!data) return;

        const newMessageId = interaction.message.id;

        const newRef = adminDb.ref(
            `messages/${author.id}/${newMessageId}`
        );

        await newRef.set({
            ...data,
            id: newMessageId,
            authorID: author.id,
            channelID: interaction.channel?.id
        });

        await oldRef.remove();

        await interaction.editOriginal({
            content: data.content ?? undefined,
            embeds: data.embeds ?? [],
            components: await SayContext(app),
        });
    });