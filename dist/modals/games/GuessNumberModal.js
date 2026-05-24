"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const modal_1 = __importDefault(require("@/struct/modal"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new modal_1.default()
    .addName("guess-number")
    .setRun(async function ({ app, author, interaction }) {
    if (author.id !== interaction.message?.interactionMetadata?.user.id) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
            components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${interaction.message?.interactionMetadata?.user.mention}!`,
                }],
        });
        return;
    }
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).once('value');
    const data = snapshot.val();
    const number = interaction.data.components.getTextInput("number", true);
    const num = Number(number);
    if (isNaN(num) || !Number.isInteger(num)) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: "Digite um número válido!",
            flags: oceanic_js_1.MessageFlags.EPHEMERAL
        });
        return;
    }
    if (num < 1 || num > 100) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: "O número deve ser entre 1 e 100!",
            flags: oceanic_js_1.MessageFlags.EPHEMERAL
        });
        return;
    }
    if (num === data.guessNumber) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: `🎉 Você acertou! O número era ${data.guessNumber}, sorteei um novo número adivinhe!`,
        });
        const guessNumber = Math.floor(Math.random() * 100) + 1;
        await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).update({
            guessNumber,
        });
        return;
    }
    if (num > data.guessNumber) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: `📉 O número secreto é menor que ${num}.`,
        });
        return;
    }
    if (num < data.guessNumber) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: `📈 O número secreto é maior que ${num}.`,
        });
        return;
    }
});
