import { adminDb } from "@/database/firebaseAdmin";
import Game2048, { Game2048Save } from "@/games/2048";
import Component from "@/struct/component";
import { ButtonStyles, ComponentTypes, MessageFlags } from "oceanic.js";

export default new Component()
    .addName('2048_up', '2048_down', '2048_left', '2048_right', '2048_stop')

    .setRun(async ({ app, author, interaction }) => {
        if(interaction.data.componentType !== 2) return;

        if (author.id !== interaction.message.interactionMetadata?.user.id) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`,
                }],
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        const snapshot = await adminDb.ref(`games/2048/${interaction.message.id}`).once('value');
        const data: Game2048Save = snapshot.val();
        const game = new Game2048(data.gridSize, data.score, data.grid, data.gameOver);
        const customID = interaction.data.customID.replace("2048_", "");

        if (game.isGameOver() || customID === "stop") {
            interaction.editOriginal({
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
                }]
            });

            await adminDb.ref(`games/2048/${interaction.message.id}`).remove();
        } else {
            game.move(customID as "up" | "down" | "left" | "right");
            await adminDb.ref(`games/2048/${interaction.message.id}`).update(game);

            interaction.editOriginal({
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
        }
    });