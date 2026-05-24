import { adminDb } from "@/database/firebaseAdmin";
import SnakeGame from "@/games/Snake";
import Command from "@/struct/command";
import { ButtonStyles, ComponentTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("play snake")

    .setRun(async ({ interaction }) => {
        const game = new SnakeGame();

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            files: [{
                name: "gameboard.png",
                contents: await game.generate(),
            }],
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `# 🐍 Jogo da cobrinha\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: "attachment://gameboard.png",
                        },
                    }]
                }]
            }, {
                type: ComponentTypes.ACTION_ROW,
                components: [{
                    customID: "snake_up",
                    emoji: {
                        name: "⬆️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "snake_down",
                    emoji: {
                        name: "⬇️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "snake_left",
                    emoji: {
                        name: "⬅️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "snake_right",
                    emoji: {
                        name: "➡️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "snake_stop",
                    emoji: { name: "🏳" },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.DANGER,
                }]
            }],
        });

        const message = await interaction.getOriginal();

        await adminDb.ref(`games/snake/${message.id}`).set(game.save());
    });