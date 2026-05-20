"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const _2048_1 = __importDefault(require("@/games/2048"));
const component_1 = __importDefault(require("@/struct/component"));
exports.default = new component_1.default()
    .addName('2048_up', '2048_down', '2048_left', '2048_right', '2048_stop')
    .setRun(async ({ author, interaction }) => {
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
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/2048/${interaction.message.id}`).once('value');
    const data = snapshot.val();
    const game = new _2048_1.default(data.gridSize, data.score, data.grid, data.gameOver);
    const customID = interaction.data.customID.replace("2048_", "");
    if (game.isGameOver() || customID === "stop") {
        interaction.editOriginal({
            embeds: [{
                    title: '2048!',
                    color: 0xff3232,
                    image: { url: "attachment://gameboard.png" },
                    description: `Pontuação: ${game.getScore()}`,
                }],
            files: [{
                    name: "gameboard.png",
                    contents: await game.generate(),
                }],
            components: [],
        });
        await firebaseAdmin_1.adminDb.ref(`games/2048/${interaction.message.id}`).remove();
    }
    else {
        game.move(customID);
        await firebaseAdmin_1.adminDb.ref(`games/2048/${interaction.message.id}`).update(game);
        interaction.editOriginal({
            embeds: [{
                    title: '2048!',
                    color: 0xff3232,
                    image: { url: "attachment://gameboard.png" },
                    description: `Pontuação: ${game.getScore()}`,
                }],
            files: [{
                    name: "gameboard.png",
                    contents: await game.generate(),
                }],
        });
    }
});
