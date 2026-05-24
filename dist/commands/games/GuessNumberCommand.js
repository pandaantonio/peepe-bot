"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("play gn")
    .setRun(async function ({ author, interaction }) {
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).once('value');
    const data = snapshot.val();
    const guessNumber = data ? data.guessNumber : Math.floor(Math.random() * 100) + 1;
    const chosenNumber = interaction.data.options.getInteger("chosen-number", true);
    if (!data) {
        await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).set({
            guessNumber,
        });
    }
    if (chosenNumber === guessNumber) {
        interaction.createFollowup({
            content: `🎉 Você acertou! O número era ${guessNumber}!`,
        });
        await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).set({
            guessNumber: Math.floor(Math.random() * 100) + 1,
        });
    }
    else {
        if (chosenNumber > guessNumber) {
            interaction.createFollowup({
                content: `📉 O número secreto é menor que ${chosenNumber}.`,
            });
        }
        if (chosenNumber < guessNumber) {
            interaction.createFollowup({
                content: `📈 O número secreto é maior que ${chosenNumber}.`,
            });
        }
    }
});
