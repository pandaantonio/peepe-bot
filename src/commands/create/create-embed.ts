import Command from "../../app/command";
import SayContext from "../../context/create-embed/SayContext";
import EphemeralOption from "../../options/EphemeralOption";
import { adminDb } from "../../database/firebaseAdmin";

export default new Command()
    .addName('create embed')

    .setRun(async function ({ app, author, interaction }) {
        await interaction.createFollowup({
            components: await SayContext(app)
        });

        const message = await interaction.getOriginal();

        const messagesRef = adminDb.ref(`messages/${author.id}/${message.id}`);

        await messagesRef.set({
            id: message.id,
            embeds: [],
            authorID: author.id,
            channelID: `${interaction.channel?.id}`,
            expiresAt: Date.now() + (1000 * 60 * 60 * 24),
        });
    })

    .setSubCommand({
        type: 1,
        name: "embed",
        nameLocalizations: {
            "pt-BR": "incorporação"
        },
        description: "Create embedded messages.",
        descriptionLocalizations: {
            "pt-BR": "Crie mensagens incorporadas."
        },
    });