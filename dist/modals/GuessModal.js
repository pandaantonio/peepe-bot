"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const modal_1 = __importDefault(require("@/struct/modal"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new modal_1.default()
    .addName('guess-number')
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
    await interaction.defer(64).catch(console.log);
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).once('value');
    const data = snapshot.val();
    const chosenNumber = parseInt(interaction.data.components.getTextInput("chosen-number", true));
    if (!chosenNumber || chosenNumber < 1 || chosenNumber > 100) {
        interaction.createFollowup({
            content: `${await app.getMenoji("no")} Por favor, insira um número válido entre 1 e 100!`,
        });
    }
    else if (chosenNumber > data?.guessNumber) {
        interaction.createFollowup({
            content: `📉 O número secreto é menor que ${chosenNumber}.`,
        });
    }
    else if (chosenNumber < data?.guessNumber) {
        interaction.createFollowup({
            content: `📈 O número secreto é maior que ${chosenNumber}.`,
        });
    }
    else if (chosenNumber === data?.guessNumber) {
        interaction.createFollowup({
            content: `🎉 Você acertou! O número era ${data?.guessNumber}!`,
        });
        await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).set({
            guessNumber: Math.floor(Math.random() * 100) + 1,
        });
    }
});
