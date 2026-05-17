"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("../../app/command"));
const SayContext_1 = __importDefault(require("../../context/create-embed/SayContext"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
exports.default = new command_1.default()
    .addName('create embed')
    .setRun(async function ({ app, author, interaction }) {
    await interaction.createFollowup({
        components: await (0, SayContext_1.default)(app)
    });
    const message = await interaction.getOriginal();
    const messagesRef = firebaseAdmin_1.adminDb.ref(`messages/${author.id}/${message.id}`);
    await messagesRef.set({
        id: message.id,
        embeds: [],
        authorID: author.id,
        channelID: `${interaction.channel?.id}`,
        expiresAt: Date.now() + (1000 * 60 * 60 * 24),
    });
})
    .setSubCommand({
    type: 1,
    name: "embed",
    nameLocalizations: {
        "pt-BR": "incorporação"
    },
    description: "Create embedded messages.",
    descriptionLocalizations: {
        "pt-BR": "Crie mensagens incorporadas."
    },
});
