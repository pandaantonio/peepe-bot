import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe, { TttSave } from "@/games/ttt";
import Component from "@/struct/component";
import { MessageFlags } from "oceanic.js";

export default new Component()
    .addName(
        'ai.ttt_0_0', 'ai.ttt_0_1', 'ai.ttt_0_2',
        'ai.ttt_1_0', 'ai.ttt_1_1', 'ai.ttt_1_2',
        'ai.ttt_2_0', 'ai.ttt_2_1', 'ai.ttt_2_2',
    )

    .setRun(async ({ app, author, interaction }) => {
        if(interaction.data.componentType !== 2) return;

        if (author.id !== interaction.message.interactionMetadata?.user.id) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`,
                }],
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        const snapshot = await adminDb.ref(`games/tttai/${interaction.message.id}`).once('value');
        const data: TttSave = snapshot.val();

        const customID = interaction.data.customID.replace("ai.ttt_", "").split("_");
        const game = new TicTacToe(
            data.board,
            data.currentPlayer,
            data.winner,
            data.isDraw
        );

        game.play(Number(customID[0]), Number(customID[1]));
        game.playAI();

        const save = game.save();
        await adminDb.ref(`games/tttai/${interaction.message.id}`).update(save);

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

        if(save.isDraw || save.winner){
            await adminDb.ref(`games/tttai/${interaction.message.id}`).remove();
        }
    })