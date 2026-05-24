import { adminDb } from "@/database/firebaseAdmin";
import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("play guess-number")

    .setRun(async function({ author, interaction }){
        const snapshot = await adminDb.ref(`games/guess-number/${author.id}`).once('value');
        const data: { guessNumber: number } | undefined = snapshot.val();
        const guessNumber = data ? data.guessNumber : Math.floor(Math.random() * 100) + 1;
        const chosenNumber = interaction.data.options.getInteger("chosen-number", true);

        if(!data){
            await adminDb.ref(`games/guess-number/${author.id}`).set({
                guessNumber,
            });
        }

        if (chosenNumber === guessNumber) {
            interaction.createFollowup({
                content: `🎉 Você acertou! O número era ${guessNumber}!`,
            });

            await adminDb.ref(`games/guess-number/${author.id}`).set({
                guessNumber: Math.floor(Math.random() * 100) + 1,
            });
        } else {
            if (chosenNumber > guessNumber) {
                interaction.createFollowup({
                    content: `📉 O número secreto é menor que ${chosenNumber}.`,
                });
            }

            if (chosenNumber < guessNumber) {
                interaction.createFollowup({
                    content: `📈 O número secreto é maior que ${chosenNumber}.`,
                });
            }
        }
    });