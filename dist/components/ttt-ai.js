"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const ttt_1 = __importDefault(require("@/games/ttt"));
const component_1 = __importDefault(require("@/struct/component"));
exports.default = new component_1.default()
    .addName('ai.ttt_0_0', 'ai.ttt_0_1', 'ai.ttt_0_2', 'ai.ttt_1_0', 'ai.ttt_1_1', 'ai.ttt_1_2', 'ai.ttt_2_0', 'ai.ttt_2_1', 'ai.ttt_2_2')
    .setRun(async ({ app, author, interaction }) => {
    if (interaction.data.componentType !== 2)
        return;
    if (author.id !== interaction.message.interactionMetadata?.user.id) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: `Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`
        });
        return;
    }
    await interaction.deferUpdate().catch(console.log);
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/tttai/${interaction.message.id}`).once('value');
    const data = snapshot.val();
    const customID = interaction.data.customID.replace("ai.ttt_", "").split("_");
    const game = new ttt_1.default(data.board, data.currentPlayer, data.winner, data.isDraw);
    game.play(Number(customID[0]), Number(customID[1]));
    game.playAI();
    const save = game.save();
    await firebaseAdmin_1.adminDb.ref(`games/tttai/${interaction.message.id}`).update(save);
    interaction.editOriginal({
        components: [{
                type: 10,
                content: save.isDraw ?
                    `Empate!` :
                    save.winner ?
                        `Vencedor(a): ${save.winner === "X" ? author.mention : app.user.mention}` :
                        `✖️ Sua vez ${author.mention}!`
            }, ...game.generate(true)]
    });
    if (save.isDraw || save.winner) {
        await firebaseAdmin_1.adminDb.ref(`games/tttai/${interaction.message.id}`).remove();
    }
});
