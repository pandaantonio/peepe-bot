"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("../app/component"));
const firebaseAdmin_1 = require("../database/firebaseAdmin");
exports.default = new component_1.default()
    .addName("delete_message")
    .setRun(async function ({ author, interaction }) {
    if (interaction.data.componentType !== 2)
        return;
    if (interaction.message.interactionMetadata?.user.id !== author.id) {
        await interaction.defer(64);
        await interaction.createFollowup({
            content: "Essa mensagem não é sua!"
        });
        return;
    }
    const messageId = interaction.message.id;
    const messageRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${messageId}`);
    const snapshot = await messageRef.once("value");
    if (!snapshot.exists())
        return;
    await interaction.deferUpdate().catch(() => { });
    await messageRef.remove();
    await interaction.editOriginal({
        content: "Mensagem apagada com sucesso!",
        embeds: [],
        components: []
    });
});
