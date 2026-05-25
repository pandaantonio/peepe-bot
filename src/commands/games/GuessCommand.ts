import { adminDb } from "@/database/firebaseAdmin";
import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("play gn")

    .setRun(async function({ author, interaction }){
        const snapshot = await adminDb.ref(`games/guess-number/${author.id}`).once('value');
        const data: { guessNumber: number } | undefined = snapshot.val();

        if(!data){
            await adminDb.ref(`games/guess-number/${author.id}`).set({
                guessNumber: Math.floor(Math.random() * 100) + 1,
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `🔢 **Adivinhe o número**\n\nTente advinhar o número secreto entre 1 e 100!`,
                }],
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 2,
                    label: "Chutar",
                    customID: "guess-number",
                }],
            }],
        });
    });