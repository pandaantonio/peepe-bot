import { adminDb } from "@/database/firebaseAdmin";
import Command from "@/struct/command";
import { MessageFlags } from "oceanic.js";

export default new Command()
    .addName("play guess-number")

    .setRun(async function({ author, interaction }){
        const guessNumber = Math.floor(Math.random() * 100) + 1;

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 10,
                content: `# 🔢 Adivinhe o número de 1 a 100!`
            }, {
                type: 1,
                components: [{
                    type: 2,
                    style: 2,
                    label: "Número Escolhido",
                    customID: "guess-number",
                }],
            }],
        });

        await adminDb.ref(`games/guess-number/${author.id}`).set({
            guessNumber,
        });
    });