"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("../../app/modal"));
const EmbedContext_1 = __importDefault(require("../../context/create-embed/EmbedContext"));
const firebaseAdmin_1 = require("../../database/firebaseAdmin");
const HexToDecimal_1 = __importStar(require("../../utils/HexToDecimal"));
exports.default = new modal_1.default()
    .addName("edit.embed")
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
    const title = interaction.data.components.getTextInput("title", false);
    const description = interaction.data.components.getTextInput("description", false);
    const color = interaction.data.components.getTextInput("color", false);
    const embeds = data.embeds || [];
    const selectedIndex = data.selectedEmbedIndex ?? 0;
    if (!embeds[selectedIndex]) {
        embeds[selectedIndex] = {};
    }
    const embed = embeds[selectedIndex];
    if (title?.trim()) {
        embed.title = title;
    }
    if (description?.trim()) {
        embed.description = description;
    }
    if (color?.trim()) {
        if (!HexToDecimal_1.HEX_REGEX.test(color)) {
            await interaction.defer(64);
            await interaction.createFollowup({
                content: "Cor hexadecimal inválida!",
                flags: 64,
            });
            return;
        }
        embed.color = (0, HexToDecimal_1.default)(color);
    }
    await interaction.deferUpdate().catch(() => { });
    await messagesRef.update({ embeds });
    interaction.editOriginal({
        embeds: embeds ?? [],
        components: await (0, EmbedContext_1.default)(app)
    });
});
