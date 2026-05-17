import { MessageFlags } from "oceanic.js";
import Component from "../app/component";
import { adminDb } from "../database/firebaseAdmin";

export default new Component()
    .addName("view_message")

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

        await interaction.defer(64);

        interaction.createFollowup(
            data.flags === MessageFlags.IS_COMPONENTS_V2 ? ({
                flags: data.flags,
                components: data.components ?? [],
            }) : ({
                embeds: data.embeds ?? [],
                content: data.content ?? undefined,
            })
        ).catch((e) => {
            interaction.createFollowup({
                content: "A Mensagem está vázia.",
            });
        });
    });