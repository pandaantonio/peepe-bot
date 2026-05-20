import { adminDb } from "@/database/firebaseAdmin";
import SnakeGame from "@/games/Snake";
import Command from "@/struct/command";
import { ButtonStyles, ComponentTypes } from "oceanic.js";

export default new Command()
    .addName("play snake")

    .setRun(async ({ interaction }) => {
        const game = new SnakeGame();

        interaction.createFollowup({
            embeds: [{
                title: 'Snake',
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
                    customID: "snake_up",
                    emoji: {
                        name: "⬆️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "snake_down",
                    emoji: {
                        name: "⬇️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "snake_left",
                    emoji: {
                        name: "⬅️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "snake_right",
                    emoji: {
                        name: "➡️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.PRIMARY,
                }, {
                    customID: "snake_stop",
                    emoji: { name: "🏳" },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.DANGER,
                }]
            }]
        });

        const message = await interaction.getOriginal();

        await adminDb.ref(`games/snake/${message.id}`).set(game.save());
    });