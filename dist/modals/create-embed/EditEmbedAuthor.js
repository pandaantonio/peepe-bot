"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("../../app/modal"));
const EmbedContext_1 = __importDefault(require("../../context/create-embed/EmbedContext"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new modal_1.default()
    .addName("edit.embed.author")
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
            content: "Essa mensagem não é sua!"
        });
        return;
    }
    const name = interaction.data.components.getTextInput("name", true);
    const url = interaction.data.components.getTextInput("url", false);
    const icon_url = interaction.data.components.getTextInput("icon_url", false);
    const embeds = data.embeds || [];
    const selectedIndex = data.selectedEmbedIndex ?? 0;
    if (!embeds[selectedIndex]) {
        embeds[selectedIndex] = {};
    }
    const embed = embeds[selectedIndex];
    if (!embed.author) {
        embed.author = {};
    }
    if (name) {
        embed.author.name = name;
    }
    if (url) {
        embed.author.url = url;
    }
    if (icon_url) {
        embed.author.icon_url = icon_url;
    }
    await interaction.deferUpdate().catch(() => { });
    await messagesRef.update({ embeds });
    await interaction.editOriginal({
        components: await (0, EmbedContext_1.default)(app)
    });
});
