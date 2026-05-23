"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("@/struct/modal"));
const EmbedContext_1 = __importDefault(require("../../context/create-embed/EmbedContext"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new modal_1.default()
    .addName("add.embed")
    .setRun(async function ({ app, author, interaction }) {
    const messageId = interaction.message?.id;
    if (!messageId)
        return;
    const messagesRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${messageId}`);
    const snapshot = await messagesRef.once("value");
    const data = snapshot.val();
    if (!data)
        return;
    if (interaction.message?.interactionMetadata?.user.id !== author.id) {
        await interaction.defer(64);
        await interaction.createFollowup({
            content: `Essa mensagem não é sua!`
        });
        return;
    }
    const title = interaction.data.components.getTextInput("title", true);
    const description = interaction.data.components.getTextInput("description", true);
    const embeds = data.embeds || [];
    if (embeds.length >= 9) {
        await interaction.defer(64);
        await interaction.createFollowup({
            content: `Limite de 10 incorporações.`
        });
        return;
    }
    await interaction.deferUpdate().catch(() => { });
    embeds.push({ title, description });
    await messagesRef.update({
        embeds: embeds,
        selectedEmbedIndex: embeds.length - 1
    });
    interaction.editOriginal({
        embeds: embeds ?? [],
        components: await (0, EmbedContext_1.default)(app),
    });
});
