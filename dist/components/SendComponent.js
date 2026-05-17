"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("../app/component"));
const firebaseAdmin_1 = require("../database/firebaseAdmin");
exports.default = new component_1.default()
    .addName("send_message")
    .setRun(async function ({ app, author, interaction }) {
    if (interaction.data.componentType !== 2)
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
    const channel = interaction.channel;
    if (!channel || channel && channel.type !== 0)
        return;
    await channel.createMessage({
        embeds: data.embeds ?? [],
        content: data.content ?? undefined,
        components: [{
                type: 1,
                components: [{
                        type: 2,
                        style: 5,
                        url: `https://discord.com/users/${author.id}`,
                        label: `Enviado por: ${author.globalName ?? author.username}`,
                    }],
            }],
    }).then(async (message) => {
        await interaction.deferUpdate().catch(() => { });
    }).catch(async (e) => {
        await interaction.defer(64);
        interaction.createFollowup({
            content: "A Mensagem está vázia.",
        });
    });
});
