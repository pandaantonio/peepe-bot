import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe from "@/games/ttt";
import Command from "@/struct/command";
import { ButtonStyles, ComponentTypes } from "oceanic.js";

export default new Command()
    .addName("play tictactoe")

    .setRun(async ({ author, interaction }) => {
        const user = interaction.data.options.getUser("user", false);

        if(!user){
            const game = new TicTacToe();

            interaction.createFollowup({
                components: game.generate(true),
                content: `✖️ Sua vez ${author.mention}!`
            });

            const message = await interaction.getOriginal();

            await adminDb.ref(`games/tttai/${message.id}`).set(game.save());
        }

        else {
            interaction.createFollowup({
                content: `${user.mention} Deseja jogar o jogo da velha com ${author.mention}?`,
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: 3,
                        label: "Sim",
                        customID: "accept_ttt",
                    }, {
                        type: 2,
                        style: 4,
                        label: "Não",
                        customID: "reject_ttt",
                    }],
                }]
            });

            const message = await interaction.getOriginal();

            await adminDb.ref(`games/tttinvite/${message.id}`).set(`${user.id}`);
        }
    });