"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const ttt_1 = __importDefault(require("@/games/ttt"));
const command_1 = __importDefault(require("@/struct/command"));
exports.default = new command_1.default()
    .addName("play tictactoe")
    .setRun(async ({ author, interaction }) => {
    const game = new ttt_1.default();
    interaction.createFollowup({
        components: game.generate(true),
        content: `✖️ Sua vez ${author.mention}!`
    });
    const message = await interaction.getOriginal();
    await firebaseAdmin_1.adminDb.ref(`games/tttai/${message.id}`).set(game.save());
});
