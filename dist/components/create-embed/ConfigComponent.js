"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("../../app/component"));
const SayContext_1 = __importDefault(require("../../context/create-embed/SayContext"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new component_1.default()
    .addName("config-embed")
    .setRun(async function ({ app, author, interaction }) {
    if (interaction.data.componentType !== 3)
        return;
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
    await interaction.deferUpdate().catch(() => { });
    const oldRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${value}`);
    const snapshot = await oldRef.once("value");
    const data = snapshot.val();
    if (!data)
        return;
    const newMessageId = interaction.message.id;
    const newRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${newMessageId}`);
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
        components: await (0, SayContext_1.default)(app),
    });
});
