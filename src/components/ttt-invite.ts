import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe from "@/games/ttt";
import Component from "@/struct/component";

export default new Component()
    .addName("accept_ttt", "reject_ttt")
    
    .setRun(async ({ app, author, interaction }) => {
        if(interaction.data.componentType !== 2) return;

        const customID = interaction.data.customID;
        const snapshot = await adminDb.ref(`games/tttinvite/${interaction.message.id}`).once('value');
        const userID: string = snapshot.val();
        const user = await app.rest.users.get(userID);

        if (author.id !== userID) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                content: `Este componente pertence á ${user.mention}!`
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        if(customID === "accept_ttt"){
            const game = new TicTacToe();

            interaction.editOriginal({
                components: game.generate(false),
                content: `✖️ Sua vez ${author.mention}!`
            });

            await adminDb.ref(`games/ttt/${interaction.message.id}`).set({
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

        await adminDb.ref(`games/tttinvite/${interaction.message.id}`).remove();
    });