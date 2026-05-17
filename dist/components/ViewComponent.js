"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const component_1 = __importDefault(require("../app/component"));
const firebaseAdmin_1 = require("../database/firebaseAdmin");
exports.default = new component_1.default()
    .addName("view_message")
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
    await interaction.defer(64);
    interaction.createFollowup(data.flags === oceanic_js_1.MessageFlags.IS_COMPONENTS_V2 ? ({
        flags: data.flags,
        components: data.components ?? [],
    }) : ({
        embeds: data.embeds ?? [],
        content: data.content ?? undefined,
    })).catch((e) => {
        interaction.createFollowup({
            content: "A Mensagem está vázia.",
        });
    });
});
