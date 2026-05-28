"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const command_1 = __importDefault(require("@/struct/command"));
const oceanic_js_1 = require("oceanic.js");
exports.default = new command_1.default()
    .addName("play gn")
    .setRun(async function ({ author, interaction }) {
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).once('value');
    const data = snapshot.val();
    if (!data) {
        await firebaseAdmin_1.adminDb.ref(`games/guess-number/${author.id}`).set({
            guessNumber: Math.floor(Math.random() * 100) + 1,
        });
    }
    interaction.createFollowup({
        flags: oceanic_js_1.MessageFlags.IS_COMPONENTS_V2,
        components: [{
                type: 17,
                components: [{
                        type: 10,
                        content: `🔢 **Adivinhe o número**\n\nTente advinhar o número secreto entre 1 e 100!`,
                    }],
            }, {
                type: 1,
                components: [{
                        type: 2,
                        style: 2,
                        label: "Chutar",
                        customID: "guess-number",
                    }],
            }],
    });
});
