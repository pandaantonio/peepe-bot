import Component from "@/struct/component";
import EmbedsContext from "@/context/create-embed/EmbedsContext";
import { adminDb } from "@/database/firebaseAdmin";

export default new Component()
    .addName("embed")

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

        if (values[0] === "url") {
            await interaction.createModal({
                customID: "edit.embed.url",
                title: "Formulário de edição de incorporação",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "url",
                        label: "Url",
                        value: data.embeds[data.i]?.url,
                    }],
                }]
            });
        } else if (values[0] === "color") {
            await interaction.createModal({
                customID: "edit.embed",
                title: "Formulário de edição de incorporação",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "color",
                        label: "Cor",
                        value: data.embeds[data.i]?.color,
                    }],
                }]
            });
        } else if (values[0] === "title") {
            await interaction.createModal({
                customID: "edit.embed",
                title: "Formulário de edição de incorporação",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "title",
                        label: "Title",
                        value: data.embeds[data.i]?.title,
                    }],
                }]
            });
        } else if (values[0] === "description") {
            await interaction.createModal({
                customID: "edit.embed",
                title: "Formulário de edição de incorporação",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 2,
                        required: true,
                        customID: "description",
                        label: "Descrição",
                        value: data.embeds[data.i]?.description,
                    }],
                }]
            });
        } else if (values[0] === "image") {
            await interaction.createModal({
                customID: "edit.embed.url",
                title: "Formulário de edição de incorporação",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "image",
                        label: "Imagem",
                        value: data.embeds[data.i]?.image?.url,
                    }],
                }]
            });
        } else if (values[0] === "thumbnail") {
            await interaction.createModal({
                customID: "edit.embed.url",
                title: "Formulário de edição de incorporação",
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "thumbnail",
                        label: "Miniatura",
                        value: data.embeds[data.i]?.thumbnail?.url,
                    }],
                }]
            });
        } else if (values[0] === "footer") {
            await interaction.createModal({
                customID: "edit.embed.footer",
                title: "Formulário de edição de incorporação",
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                style: 1,
                                required: true,
                                customID: "text",
                                label: "Texto do rodapé",
                                value: data.embeds[data.i]?.footer?.text || "",
                            },
                        ],
                    },
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                style: 1,
                                required: false,
                                customID: "icon_url",
                                label: "Ícone do rodapé",
                                value: data.embeds[data.i]?.footer?.icon_url || "",
                            },
                        ],
                    },
                ],
            });
        } else if (values[0] === "author") {
            await interaction.createModal({
                customID: "edit.embed.author",
                title: "Formulário de edição de incorporação",
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                style: 1,
                                required: true,
                                customID: "name",
                                label: "Nome do autor",
                                value: data.embeds[data.i]?.author?.name || "",
                            },
                        ],
                    },
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                style: 1,
                                required: false,
                                customID: "icon_url",
                                label: "Ícone do autor",
                                value: data.embeds[data.i]?.author?.icon_url || "",
                            },
                        ],
                    },
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                style: 1,
                                required: false,
                                customID: "url",
                                label: "Url do autor",
                                value: data.embeds[data.i]?.author?.url || "",
                            },
                        ],
                    },
                ],
            });
        } else if (values[0] === "embeds") {
            await interaction.deferUpdate().catch(() => { });

            interaction.editOriginal({
                components: await EmbedsContext(app, data.embeds),
            });
        }
    });