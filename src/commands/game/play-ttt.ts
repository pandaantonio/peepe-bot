import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe from "@/games/ttt";
import Command from "@/struct/command";

export default new Command()
    .addName("play tictactoe")

    .setRun(async ({ author, interaction }) => {
        const game = new TicTacToe();

        interaction.createFollowup({
            components: game.generate(true),
            content: `✖️ Sua vez ${author.mention}!`
        });

        const message = await interaction.getOriginal();

        await adminDb.ref(`games/tttai/${message.id}`).set(game.save());
    });