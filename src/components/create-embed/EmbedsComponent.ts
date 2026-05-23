import Component from "../../app/component";
import EmbedContext from "../../context/create-embed/EmbedContext";
import SayContext from "../../context/create-embed/SayContext";
import { adminDb } from "../../database/firebaseAdmin";

export default new Component()
    .addName("embeds")

    .setRun(async function ({ app, author, interaction }) {
        if (interaction.data.componentType !== 3) return;

        // ── Verifica se a mensagem pertence ao usuário PRIMEIRO ──
        if (interaction.message.interactionMetadata?.user.id !== author.id) {
            await interaction.defer(64);
            await interaction.createFollowup({
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
        const selectedValue = values[0];

        // ── Adicionar novo embed ──
        if (selectedValue === "add.embed") {
            await interaction.createModal({
                customID: "add.embed",
                title: "Formulário de adição de incorporação",
                components: [
                    {
                        type: 1,
                        components: [{
                            type: 4,
                            style: 1,
                            required: false,
                            customID: "title",
                            label: "Título",
                        }],
                    },
                    {
                        type: 1,
                        components: [{
                            type: 4,
                            style: 2,
                            required: false,
                            customID: "description",
                            label: "Descrição",
                        }]
                    }
                ]
            });
            return;
        }

        // ── Mudar para contexto Say ──
        if (selectedValue === "say") {
            await interaction.deferUpdate().catch(() => { });
            await interaction.editOriginal({
                components: await SayContext(app),
            });
            return;
        }

        // ── Selecionar um embed existente (ex: "embed.0", "embed.1") ──
        await interaction.deferUpdate().catch(() => { });

        const index = Number(selectedValue.split(".")[1]);

        // Salva o índice do embed selecionado no Firebase
        await messagesRef.update({ selectedEmbedIndex: index });

        interaction.editOriginal({
            components: await EmbedContext(app),
        });
    });