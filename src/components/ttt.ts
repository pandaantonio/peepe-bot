import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe, { TttSave } from "@/games/ttt";
import Component from "@/struct/component";

export default new Component()
    .addName(
        'ttt_0_0', 'ttt_0_1', 'ttt_0_2',
        'ttt_1_0', 'ttt_1_1', 'ttt_1_2',
        'ttt_2_0', 'ttt_2_1', 'ttt_2_2',
    )

    .setRun(async ({ app, author, interaction }) => {
        if(interaction.data.componentType !== 2) return;

        const snapshot = await adminDb.ref(`games/ttt/${interaction.message.id}`).once('value');
        const data: { userID: string, game: TttSave } = snapshot.val();
        const user = await app.rest.users.get(data.userID);

        if (
            author.id !== (
            data.game.currentPlayer === "X" ?
                interaction.message.interactionMetadata?.user.id :
                data.userID)
        ) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                content: `Este componente pertence á ${
                data.game.currentPlayer === "X" ?
                    interaction.message.interactionMetadata?.user.mention
                    : user.mention}!`
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        const game = new TicTacToe(
            data.game.board,
            data.game.currentPlayer,
            data.game.winner,
            data.game.isDraw,
        );
        const customID = interaction.data.customID.replace("ttt_", "").split("_");

        game.play(Number(customID[0]), Number(customID[1]));

        const stat = game.save();

        await adminDb.ref(`games/ttt/${interaction.message.id}`).update({
            userID: data.userID,
            game: stat,
        });

        interaction.editOriginal({
            components: game.generate(false),
            content: stat.isDraw ?
                "Empate!" :
                    stat.winner ?
                        `Vencedor(a): ${stat.winner === "X" ? interaction.message.interactionMetadata?.user.mention : user.mention}` :
                        `${stat.currentPlayer === "X" ? "✖️" : "⚫️"} Vez de ${stat.currentPlayer === "X" ? interaction.message.interactionMetadata?.user.mention : user.mention}!` 
        });

        if(stat.isDraw || stat.winner){
            await adminDb.ref(`games/ttt/${interaction.message.id}`).remove();
        }
    })