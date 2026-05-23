"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("@/struct/modal"));
const SayContext_1 = __importDefault(require("../../context/create-embed/SayContext"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new modal_1.default()
    .addName("config-message")
    .setRun(async function ({ app, author, interaction }) {
    if (interaction.message?.interactionMetadata?.user.id !== author.id) {
        await interaction.defer(64);
        await interaction.createFollowup({
            content: `Essa mensagem não é sua!`
        });
        return;
    }
    await interaction.deferUpdate().catch(() => { });
    const name = interaction.data.components.getTextInput("name", true);
    const messagesRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${interaction.message.id}`);
    await messagesRef.update({
        name,
        id: `${interaction.message.id}`,
        authorID: author.id,
        channelID: `${interaction.channel?.id}`,
    });
    interaction.editOriginal({
        components: await (0, SayContext_1.default)(app),
    });
});
