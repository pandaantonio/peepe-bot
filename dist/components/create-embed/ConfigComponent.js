"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("../../app/component"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new component_1.default()
    .addName('config-embed')
    .setRun(async ({ app, author, interaction }) => {
    if (interaction.data.componentType !== 3)
        return;
    if (interaction.message.interactionMetadata?.user.id !== author.id) {
        await interaction.defer(64);
        interaction.createFollowup({
            content: `Essa mensagem não é sua!`
        });
        return;
    }
    const messageId = interaction.message.id;
    const messagesRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${messageId}`);
    const snapshot = await messagesRef.once("value");
    const data = snapshot.val();
    await interaction.createModal({
        title: "Formulário de configuração de mensagem",
        customID: "config-embed",
        components: [{
                type: 1,
                components: [{
                        type: 4,
                        style: 1,
                        required: true,
                        customID: "name",
                        label: "Nome da mensagem",
                    }],
            }]
    });
});
