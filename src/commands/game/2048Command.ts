import { adminDb } from "@/database/firebaseAdmin";
import Game2048 from "@/games/2048";
import Command from "@/struct/command";
import { ButtonStyles, ComponentTypes, MessageFlags } from "oceanic.js";

export default new Command()
    .addName("play 2048")

    .setRun(async ({ interaction }) => {
        const game = new Game2048();

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
                    content: `# 🎮 2048\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                }, {
                    type: 12,
                    items: [{
                        media: {
                            url: "attachment://gameboard.png",
                        },
                    }]
                }],
            }, {
                type: ComponentTypes.ACTION_ROW,
                components: [{
                    customID: "2048_up",
                    emoji: {
                        name: "⬆️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_down",
                    emoji: {
                        name: "⬇️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_left",
                    emoji: {
                        name: "⬅️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_right",
                    emoji: {
                        name: "➡️",
                    },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.SECONDARY,
                }, {
                    customID: "2048_stop",
                    emoji: { name: "🏳" },
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.DANGER,
                }],
            }],
        });

        const message = await interaction.getOriginal();

        await adminDb.ref(`games/2048/${message.id}`).set(game.save());
    });