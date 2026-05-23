import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe from "@/games/ttt";
import Command from "@/struct/command";
import { ButtonStyles, ComponentTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("play tictactoe")

    .setRun(async ({ author, interaction }) => {
        const user = interaction.data.options.getUser("user", false);

        if(!user){
            const game = new TicTacToe();

            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `✖️ Sua vez ${author.mention}!`,
                }, ...game.generate(true)],
            });

            const message = await interaction.getOriginal();

            await adminDb.ref(`games/tttai/${message.id}`).set(game.save());
        }

        else {
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${user.mention} Deseja jogar o jogo da velha com ${author.mention}?`,
                },{
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