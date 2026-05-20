"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const Snake_1 = __importDefault(require("@/games/Snake"));
const component_1 = __importDefault(require("@/struct/component"));
exports.default = new component_1.default()
    .addName('snake_up', 'snake_down', 'snake_left', 'snake_right', 'snake_stop')
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
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/snake/${interaction.message.id}`).once('value');
    const data = snapshot.val();
    const game = new Snake_1.default(data);
    const customID = interaction.data.customID.replace("snake_", "");
    if (game.isGameOver() || customID === "stop") {
        interaction.editOriginal({
            embeds: [{
                    title: 'Snake',
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
        await firebaseAdmin_1.adminDb.ref(`games/snake/${interaction.message.id}`).remove();
    }
    else {
        game.setDirection(customID);
        await firebaseAdmin_1.adminDb.ref(`games/snake/${interaction.message.id}`).update(game);
        interaction.editOriginal({
            embeds: [{
                    title: 'Snake',
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
