import { adminDb } from "@/database/firebaseAdmin";
import Game2048 from "@/games/2048";
import Command from "@/struct/command";
import { ButtonStyles, ComponentTypes } from "oceanic.js";

export default new Command()
    .addName("play 2048")

    .setRun(async ({ interaction }) => {
        const game = new Game2048();

        interaction.createFollowup({
            embeds: [{
                title: '2048!',
                color: 0x0e7aff,
                image: { url: "attachment://gameboard.png" },
                description: `Pontuação: ${game.getScore()}`,
            }],
            files: [{
                name: "gameboard.png",
                contents: await game.generate(),
            }],
            components: [{
                type: ComponentTypes.ACTION_ROW,
                components: [{
                    customID: "2048_up",
                    emoji: {
                        name: "⬆️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "2048_down",
                    emoji: {
                        name: "⬇️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "2048_left",
                    emoji: {
                        name: "⬅️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "2048_right",
                    emoji: {
                        name: "➡️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "2048_stop",
                    emoji: { name: "🏳" },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.DANGER,
                }]
            }]
        });

        const message = await interaction.getOriginal();

        await adminDb.ref(`games/2048/${message.id}`).set(game.save());
    });