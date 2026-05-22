"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin_1 = require("@/database/firebaseAdmin");
const ttt_1 = __importDefault(require("@/games/ttt"));
const component_1 = __importDefault(require("@/struct/component"));
exports.default = new component_1.default()
    .addName("accept_ttt", "reject_ttt")
    .setRun(async ({ app, author, interaction }) => {
    if (interaction.data.componentType !== 2)
        return;
    const customID = interaction.data.customID;
    const snapshot = await firebaseAdmin_1.adminDb.ref(`games/tttinvite/${interaction.message.id}`).once('value');
    const userID = snapshot.val();
    const user = await app.rest.users.get(userID);
    if (author.id !== userID) {
        await interaction.defer(64).catch(console.log);
        interaction.createFollowup({
            content: `Este componente pertence á ${user.mention}!`
        });
        return;
    }
    await interaction.deferUpdate().catch(console.log);
    if (customID === "accept_ttt") {
        const game = new ttt_1.default();
        interaction.editOriginal({
            components: game.generate(false),
            content: `✖️ Sua vez ${author.mention}!`
        });
        await firebaseAdmin_1.adminDb.ref(`games/ttt/${interaction.message.id}`).set({
            userID,
            game: game.save(),
        });
    }
    else {
        interaction.editOriginal({
            components: [],
            content: "Convite rejeitado!"
        });
    }
    await firebaseAdmin_1.adminDb.ref(`games/tttinvite/${interaction.message.id}`).remove();
});
