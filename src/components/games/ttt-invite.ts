import { adminDb } from "@/database/firebaseAdmin";
import TicTacToe from "@/games/ttt";
import Component from "@/struct/component";
import { MessageFlags } from "oceanic.js";

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
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${user.mention}!`,
                }],
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        if(customID === "accept_ttt"){
            const game = new TicTacToe();

            interaction.editOriginal({
                components: [{
                    type: 10,
                    content: `✖️ Sua vez ${author.mention}!`,
                }, ...game.generate(false)],
            });

            await adminDb.ref(`games/ttt/${interaction.message.id}`).set({
                userID,
                game: game.save(),
            });
        } 

        else {
            interaction.editOriginal({
                components: [{
                    type: 10,
                    content: "Convite rejeitado!",
                }],
            });
        }

        await adminDb.ref(`games/tttinvite/${interaction.message.id}`).remove();
    });