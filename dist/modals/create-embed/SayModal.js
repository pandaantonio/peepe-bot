"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("../../app/modal"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new modal_1.default()
    .addName("say")
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
    await interaction.deferUpdate().catch(() => { });
    const content = interaction.data.components.getTextInput("content", true);
    await messagesRef.update({ content });
});
