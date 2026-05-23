"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("@/struct/component"));
const EmbedsContext_1 = __importDefault(require("@/context/create-embed/EmbedsContext"));
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
exports.default = new component_1.default()
    .addName("say")
    .setRun(async function ({ app, author, interaction }) {
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
    if (!data)
        return;
    const values = interaction.data.values.getStrings();
    if (values[0] === "content") {
        await interaction.createModal({
            customID: "say",
            title: "Formulário de edição de mensagem",
            components: [{
                    type: 1,
                    components: [{
                            type: 4,
                            style: 2,
                            required: true,
                            customID: "content",
                            label: "Conteúdo",
                            value: data.content,
                        }]
                }]
        });
    }
    else {
        await interaction.deferUpdate().catch((e) => { });
        interaction.editOriginal({
            components: await (0, EmbedsContext_1.default)(app, data.embeds),
        });
    }
});
