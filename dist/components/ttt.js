"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const ttt_1 = __importDefault(require("@/games/ttt"));
const component_1 = __importDefault(require("@/struct/component"));
exports.default = new component_1.default()
    .addName('ttt_0_0', 'ttt_0_1', 'ttt_0_2', 'ttt_1_0', 'ttt_1_1', 'ttt_1_2', 'ttt_2_0', 'ttt_2_1', 'ttt_2_2')
    .setRun(async ({ app, author, interaction }) => {
    if (interaction.data.componentType !== 2)
        return;
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/ttt/${interaction.message.id}`).once('value');
    const data = snapshot.val();
    const user = await app.rest.users.get(data.userID);
    if (author.id !== (data.game.currentPlayer === "X" ?
        interaction.message.interactionMetadata?.user.id :
        data.userID)) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: `Este componente pertence á ${data.game.currentPlayer === "X" ?
                interaction.message.interactionMetadata?.user.mention
                : user.mention}!`
        });
        return;
    }
    await interaction.deferUpdate().catch(console.log);
    const game = new ttt_1.default(data.game.board, data.game.currentPlayer, data.game.winner, data.game.isDraw);
    const customID = interaction.data.customID.replace("ttt_", "").split("_");
    game.play(Number(customID[0]), Number(customID[1]));
    const stat = game.save();
    await firebaseAdmin_1.adminDb.ref(`games/ttt/${interaction.message.id}`).update({
        userID: data.userID,
        game: stat,
    });
    interaction.editOriginal({
        components: [{
                type: 10,
                content: stat.isDraw ?
                    "Empate!" :
                    stat.winner ?
                        `Vencedor(a): ${stat.winner === "X" ? interaction.message.interactionMetadata?.user.mention : user.mention}` :
                        `${stat.currentPlayer === "X" ? "✖️" : "⚫️"} Vez de ${stat.currentPlayer === "X" ? interaction.message.interactionMetadata?.user.mention : user.mention}!`,
            }, ...game.generate(false)]
    });
    if (stat.isDraw || stat.winner) {
        await firebaseAdmin_1.adminDb.ref(`games/ttt/${interaction.message.id}`).remove();
    }
});
